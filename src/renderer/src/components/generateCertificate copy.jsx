// src/renderer/src/components/generateCertificate.js
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { toast } from 'sonner'
import { format, parse } from 'date-fns'
import dateConverter from '@nexisltd/date2word'

const generateCertificate = async (student) => {
  try {
    const result = await window.api.generateCertificate(student.studentId)
    if (!result.success) {
      throw new Error(result.error)
    }
    const updatedStudent = result.data
    const serialNumber = result.serialNumber

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB')
    }

    const createField = (label, value, size) => {
      const field = value || ''
      const padding = '&nbsp;'.repeat(Math.max(0, size - field.length))
      return `<strong>${label}:</strong> <span style="display: inline-block; position: relative; width: ${size}ch;">${field}${padding}<span style="position: absolute; bottom: -5px; left: 0; right: 0; border-bottom: 1px solid black;"></span></span>`
    }

    const dateOfBirthInWords = dateConverter(new Date(updatedStudent.dateOfBirth), {
      isCapitalized: true,
      isDateFirst: true
    })

    const certificateHTML = `
      <div id="certificate" style="width: 210mm; height: 297mm; padding: 20mm 12mm; box-sizing: border-box; background-color: white; font-family: 'Times New Roman', Times, serif; border: 2px solid black; font-size: 12pt; position: relative;">
        <style>
          #certificate pre {
            line-height: 2;
          }
          #certificate strong {
            font-weight: 700;
          }
        </style>
        <div style="position: absolute; top: 10mm; left: 10mm; right: 10mm; bottom: 10mm; border: 2px solid black;"></div>
        <h3 style="text-align: center; font-weight: bold; margin-top: -40px; margin-bottom: -6x;">Jaggannath Shikshan Prasarak Mandal's</h3>
        <h2 style="text-align: center; font-size: 23px; font-weight: bold;  margin-bottom: -6px;">Shashikant Sakharam Chaudhari Kanya Vidyalay, Yawal</h2>
        <h3 style="text-align: center; font-weight: bold; margin-top: 0;">Taluka- Yawal, Dist. Jalgaon</h3>
        <p style="text-align: center; margin-top: -6px;">Phone No. 02585-261290 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; E Mail - mksyawal@yahoo.in</p>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0px;">
          <span><strong>Sr. No.</strong> ${createField('', serialNumber.toString(), 8)}</span>
          <span><strong>G. Register No.</strong> ${createField('', updatedStudent.grn, 6)}</span>
        </div>
<div style="display: flex; justify-content: space-between; margin-bottom: 0px;">
  <span><strong>School Reg. No.</strong>- Edu. Depu.Dir/Sec-2/First Appru/</span>
  <span><strong>TEN:</strong> ${createField('', updatedStudent.ten, 15)}</span>
</div>
<div style="display: flex; justify-content: space-between; margin-bottom: 0px;">
  <span style="padding-left: 7.5em;">90-91/92/Div.Sec.Depu.Dir.Nashik/Datted 12-3-92</span>
  <span><strong>Medium:</strong> Marathi</span>
</div>
        <div style="display: flex; justify-content: space-between; margin-bottom: -10px;">
          <span><strong>U Dise No.</strong>- 27031508414</span>
          <span><strong>Board</strong>- Nashik</span>
          <span><strong>Index No.</strong>- 15.15.005</span>
        </div>
        <div style="text-align: center; margin-bottom: 0px;">
          <span style="font-size: 36px; font-weight: bold; text-decoration: underline;">Leaving Certificate</span>
        </div>
        <pre style="line-height: 1.6; padding: 10px 0; font-family: inherit; font-size: inherit; margin: 0; white-space: pre-wrap; word-wrap: break-word;">
${createField('Student ID', updatedStudent.studentId, 25)} ${createField('U.I.D. No. (Aadhar Card No.)', updatedStudent.aadharNo, 24)}
<strong>Name of the student in full</strong> ${createField('(Name)', updatedStudent.name, 20)} ${createField("(Father's Name)", updatedStudent.fathersName, 20)}
                                          ${createField('(Surname)', updatedStudent.surname, 30)}
${createField("Mother's Name", updatedStudent.mothersName, 40)}
${createField('Nationality', updatedStudent.nationality || 'Indian', 20)} ${createField('Mother tongue', updatedStudent.motherTongue, 40)}
${createField('Religion', updatedStudent.religion, 15)} ${createField('Caste', updatedStudent.caste, 20)} ${createField('Sub-caste', updatedStudent.subCaste, 25)}
${createField('Place of Birth', updatedStudent.placeOfBirth, 10)} ${createField('Taluka', updatedStudent.taluka, 10)} ${createField('Dist', updatedStudent.district, 10)} ${createField('State', updatedStudent.state, 12)} <strong>Country:</strong> India
${createField('Date of Birth (DD/MM/YY) according to the Christian era', formatDate(updatedStudent.dateOfBirth), 34)}
${createField('Date of Birth (In words)', dateOfBirthInWords, 64)}
<strong>Last school attended & standard:</strong>${createField('', updatedStudent.lastAttendedSchool, 55)}
${createField('', updatedStudent.lastSchoolStandard, 85)}
${createField('Date of admission in this school', formatDate(updatedStudent.dateOfAdmission), 24)} ${createField('Standard', updatedStudent.admissionStandard, 25)}
${createField('Progress', updatedStudent.progress, 33)} ${createField('Conduct', updatedStudent.conduct, 35)}
${createField('Date of leaving school', formatDate(updatedStudent.dateOfLeaving), 65)}
${createField('Standard in which studying and since when (in words and figure)', updatedStudent.currentStandard, 85)}
${createField('Reason of leaving school', updatedStudent.reasonOfLeaving, 64)}
${createField('Remarks', updatedStudent.remarks, 78)}
        </pre>
        <p style="margin-top: -30px;  font-weight: bold;">Certified that the above information is in accordance with the School Register.</p>
        <div style="display: flex; justify-content: space-between; margin-top: 40px;">
          <div><strong>Date:</strong> ${new Date().getDate()}</div>
          <div><strong>Month:</strong> ${new Date().toLocaleString('default', { month: 'long' })}</div>
          <div><strong>Year:</strong> ${new Date().getFullYear()}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 40px;">
          <div><strong>Class Teacher</strong></div>
          <div><strong>Clerk</strong></div>
          <div><strong>Head Master</strong><br>(Seal)</div>
        </div>
        <pre style="font-size: 10pt; margin-top: 20px;">* No change in any entry in this certificate shall be made except by the authority issuing it.
* Any infringement of the rule is liable to be dealt with by rustication or by other suitable
punishment.</pre>
      </div>
    `

    const certificateContainer = document.createElement('div')
    certificateContainer.innerHTML = certificateHTML

    document.body.appendChild(certificateContainer)

    const canvas = await html2canvas(certificateContainer.querySelector('#certificate'), {
      scale: 2,
      width: 210 * 3.78,
      height: 297 * 3.78
    })

    const imgData = canvas.toDataURL('image/jpeg', 1.0)

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
    pdf.save(
      `${updatedStudent.name || 'Unnamed'}_${updatedStudent.surname || 'Student'}_leaving_certificate.pdf`
    )

    document.body.removeChild(certificateContainer)

    toast.success(
      'Certificate Generated',
      `The comprehensive A4 certificate has been generated and downloaded. Certificate count: ${updatedStudent.certGenCount}`
    )

    return updatedStudent
  } catch (error) {
    console.error('Error generating certificate:', error)
    toast.error('Error', 'There was an error generating the certificate. Please try again.')
    throw error
  }
}

export default generateCertificate
