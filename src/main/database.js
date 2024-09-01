// src/main/database.js

import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import * as XLSX from 'xlsx'
import { parse } from 'csv-parse/sync'

let db

export async function initializeDatabase() {
  db = await open({
    filename: 'students.sqlite',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentId TEXT UNIQUE,
      aadharNo TEXT,
      name TEXT,
      surname TEXT,
      fathersName TEXT,
      mothersName TEXT,
      religion TEXT,
      caste TEXT,
      subCaste TEXT,
      placeOfBirth TEXT,
      taluka TEXT,
      district TEXT,
      state TEXT,
      dateOfBirth TEXT,
      lastAttendedSchool TEXT,
      lastSchoolStandard TEXT,
      dateOfAdmission TEXT,
      admissionStandard TEXT,
      progress TEXT,
      conduct TEXT,
      dateOfLeaving TEXT,
      currentStandard TEXT,
      reasonOfLeaving TEXT,
      remarks TEXT,
      motherTongue TEXT,
      ten TEXT,
      grn TEXT,
      certGenCount INTEGER DEFAULT 0
    )
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serialNumber INTEGER UNIQUE,
      studentId TEXT,
      generatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES students(studentId)
    )
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS certificate_counter (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      lastSerialNumber INTEGER DEFAULT 0
    )
  `)

  // Initialize certificate counter if not exists
  const counterExists = await db.get('SELECT * FROM certificate_counter WHERE id = 1')
  if (!counterExists) {
    await db.run('INSERT INTO certificate_counter (id, lastSerialNumber) VALUES (1, 0)')
  }

  const indexInfo = await db.all("PRAGMA index_list('students')")
  const studentIdIndex = indexInfo.find((index) => index.name === 'idx_studentId')

  if (!studentIdIndex) {
    await db.exec('CREATE UNIQUE INDEX idx_studentId ON students(studentId)')
  }
}

export async function getStudents() {
  return db.all('SELECT * FROM students')
}

export async function addStudent(student) {
  const result = await db.run(
    `
    INSERT OR REPLACE INTO students (
      studentId, aadharNo, name, surname, fathersName, mothersName,
      religion, caste, subCaste, placeOfBirth, taluka, district, state,
      dateOfBirth, lastAttendedSchool, lastSchoolStandard, dateOfAdmission,
      admissionStandard, progress, conduct, dateOfLeaving, currentStandard,
      reasonOfLeaving, remarks, motherTongue, ten, grn, certGenCount
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      student.studentId,
      student.aadharNo,
      student.name,
      student.surname,
      student.fathersName,
      student.mothersName,
      student.religion,
      student.caste,
      student.subCaste,
      student.placeOfBirth,
      student.taluka,
      student.district,
      student.state,
      student.dateOfBirth,
      student.lastAttendedSchool,
      student.lastSchoolStandard,
      student.dateOfAdmission,
      student.admissionStandard,
      student.progress,
      student.conduct,
      student.dateOfLeaving,
      student.currentStandard,
      student.reasonOfLeaving,
      student.remarks,
      student.motherTongue,
      student.ten,
      student.grn,
      student.certGenCount
    ]
  )
  return result.lastID
}

export async function updateStudent(student) {
  await db.run(
    `
    UPDATE students SET
      aadharNo = ?, name = ?, surname = ?, fathersName = ?,
      mothersName = ?, religion = ?, caste = ?, subCaste = ?, placeOfBirth = ?,
      taluka = ?, district = ?, state = ?, dateOfBirth = ?, lastAttendedSchool = ?,
      lastSchoolStandard = ?, dateOfAdmission = ?, admissionStandard = ?,
      progress = ?, conduct = ?, dateOfLeaving = ?, currentStandard = ?,
      reasonOfLeaving = ?, remarks = ?, motherTongue = ?, ten = ?, grn = ?,
      certGenCount = ?
    WHERE studentId = ?
  `,
    [
      student.aadharNo,
      student.name,
      student.surname,
      student.fathersName,
      student.mothersName,
      student.religion,
      student.caste,
      student.subCaste,
      student.placeOfBirth,
      student.taluka,
      student.district,
      student.state,
      student.dateOfBirth,
      student.lastAttendedSchool,
      student.lastSchoolStandard,
      student.dateOfAdmission,
      student.admissionStandard,
      student.progress,
      student.conduct,
      student.dateOfLeaving,
      student.currentStandard,
      student.reasonOfLeaving,
      student.remarks,
      student.motherTongue,
      student.ten,
      student.grn,
      student.certGenCount,
      student.studentId
    ]
  )
}

export async function deleteStudent(studentId) {
  const result = await db.run('DELETE FROM students WHERE studentId = ?', studentId)
  return result.changes
}

export async function generateCertificate(studentId) {
  await db.run('BEGIN TRANSACTION')

  try {
    const [student] = await db.all('SELECT * FROM students WHERE studentId = ?', studentId)

    if (!student) {
      throw new Error('Student not found')
    }

    const newCertGenCount = (student.certGenCount || 0) + 1

    await db.run('UPDATE students SET certGenCount = ? WHERE studentId = ?', [
      newCertGenCount,
      studentId
    ])

    const { lastSerialNumber } = await db.get(
      'SELECT lastSerialNumber FROM certificate_counter WHERE id = 1'
    )
    const newSerialNumber = lastSerialNumber + 1

    await db.run(
      'UPDATE certificate_counter SET lastSerialNumber = ? WHERE id = 1',
      newSerialNumber
    )

    await db.run('INSERT INTO certificates (serialNumber, studentId) VALUES (?, ?)', [
      newSerialNumber,
      studentId
    ])

    await db.run('COMMIT')

    const [updatedStudent] = await db.all('SELECT * FROM students WHERE studentId = ?', studentId)

    return {
      data: updatedStudent,
      serialNumber: newSerialNumber
    }
  } catch (error) {
    await db.run('ROLLBACK')
    throw error
  }
}
export async function getStudentById(studentId) {
  try {
    const student = await db.get('SELECT * FROM students WHERE studentId = ?', studentId)
    return student
  } catch (error) {
    console.error('Error fetching student by ID:', error)
    throw error
  }
}
export async function importStudents(filePath) {
  let data
  if (filePath.endsWith('.csv')) {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    data = parse(fileContent, { columns: true, skip_empty_lines: true })
  } else {
    const workbook = XLSX.readFile(filePath)
    const worksheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[worksheetName]
    data = XLSX.utils.sheet_to_json(worksheet)
  }

  await db.run('BEGIN TRANSACTION')

  try {
    for (const item of data) {
      const dateOfBirth = parseDate(item.dateOfBirth)
      const dateOfAdmission = parseDate(item.dateOfAdmission)
      const dateOfLeaving = parseDate(item.dateOfLeaving)

      await db.run(
        `
        INSERT OR REPLACE INTO students (
          studentId, aadharNo, name, surname, fathersName, mothersName,
          religion, caste, subCaste, placeOfBirth, taluka, district, state,
          dateOfBirth, lastAttendedSchool, lastSchoolStandard, dateOfAdmission,
          admissionStandard, progress, conduct, dateOfLeaving, currentStandard,
          reasonOfLeaving, remarks, motherTongue, ten, grn, certGenCount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          item.studentId,
          item.aadharNo,
          item.name,
          item.surname,
          item.fathersName,
          item.mothersName,
          item.religion,
          item.caste,
          item.subCaste,
          item.placeOfBirth,
          item.taluka,
          item.district,
          item.state,
          dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : null,
          item.lastAttendedSchool,
          item.lastSchoolStandard,
          dateOfAdmission ? dateOfAdmission.toISOString().split('T')[0] : null,
          item.admissionStandard,
          item.progress,
          item.conduct,
          dateOfLeaving ? dateOfLeaving.toISOString().split('T')[0] : null,
          item.currentStandard,
          item.reasonOfLeaving,
          item.remarks,
          item.motherTongue,
          item.ten,
          item.grn,
          item.certGenCount || 0
        ]
      )
    }

    await db.run('COMMIT')
    return getStudents()
  } catch (error) {
    await db.run('ROLLBACK')
    throw error
  }
}

function parseDate(value) {
  if (typeof value === 'number') {
    const utc_days = Math.floor(value - 25569)
    const utc_value = utc_days * 86400
    const date_info = new Date(utc_value * 1000)
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate())
  } else if (typeof value === 'string') {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return date
    }
    const parts = value.split('/')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }
  return null
}
