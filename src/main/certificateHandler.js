import { ipcMain } from 'electron'
import { generateLeaveCertificate, generateBonafideCertificate } from './certificateGenerator'
import * as db from './database'
import fs from 'fs'
import path from 'path'
import os from 'os'

export function setupCertificateHandler() {
  ipcMain.handle('generate-leave-certificate', async (event, studentId, isDraft = true) => {
    try {
      const student = await db.getStudentById(studentId)
      if (!student) {
        throw new Error('Student not found')
      }
      const pdfBuffer = await generateLeaveCertificate(student, isDraft)
      const tempPath = path.join(os.tmpdir(), `leave_certificate_${studentId}.pdf`)
      fs.writeFileSync(tempPath, Buffer.from(pdfBuffer))
      return { success: true, tempPath }
    } catch (error) {
      console.error('Error generating leave certificate:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('generate-bonafide-certificate', async (event, studentId, isDraft = true) => {
    try {
      const student = await db.getStudentById(studentId)
      if (!student) {
        throw new Error('Student not found')
      }
      const pdfBuffer = await generateBonafideCertificate(student, isDraft)
      const tempPath = path.join(os.tmpdir(), `bonafide_certificate_${studentId}.pdf`)
      fs.writeFileSync(tempPath, Buffer.from(pdfBuffer))
      return { success: true, tempPath }
    } catch (error) {
      console.error('Error generating bonafide certificate:', error)
      return { success: false, error: error.message }
    }
  })
}
