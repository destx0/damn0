import puppeteer from 'puppeteer'

let leaveCertificateNumber = 1000
let bonafideCertificateNumber = 2000

export const getNextLeaveCertificateNumber = () => {
  return leaveCertificateNumber++
}

export const getNextBonafideCertificateNumber = () => {
  return bonafideCertificateNumber++
}

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

const dateToWords = (date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const numberToWords = (num) => {
    const units = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen'
    ]
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety'
    ]

    if (num < 20) return units[num]
    const digit = num % 10
    if (num < 100) return tens[Math.floor(num / 10)] + (digit ? '-' + units[digit] : '')
    if (num < 1000)
      return (
        units[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' and ' + numberToWords(num % 100) : '')
      )
    return (
      numberToWords(Math.floor(num / 1000)) +
      ' Thousand' +
      (num % 1000 ? ' ' + numberToWords(num % 1000) : '')
    )
  }

  return `${numberToWords(day)} ${month} ${numberToWords(year)}`
}

const generateCertificateHTML = (student, type, serialNumber, isDraft) => {
  const dateOfBirth = student.dateOfBirth ? new Date(student.dateOfBirth) : null
  const dateOfBirthInWords = dateOfBirth ? dateToWords(dateOfBirth) : ''

  return `
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
        <span><strong>Sr. No.</strong> ${createField('', isDraft ? 'DRAFT' : serialNumber.toString(), 8)}</span>
        <span><strong>G. Register No.</strong> ${createField('', student.grn, 6)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0px;">
        <span><strong>School Reg. No.</strong>- Edu. Depu.Dir/Sec-2/First Appru/</span>
        <span><strong>TEN:</strong> ${createField('', student.ten, 15)}</span>
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
        <span style="font-size: 36px; font-weight: bold; text-decoration: underline;">${type === 'leave' ? 'Leaving Certificate' : 'Bonafide Certificate'}</span>
      </div>
      <pre style="line-height: 1.6; padding: 10px 0; font-family: inherit; font-size: inherit; margin: 0; white-space: pre-wrap; word-wrap: break-word;">
${createField('Student ID', student.studentId, 25)} ${createField('U.I.D. No. (Aadhar Card No.)', student.aadharNo, 24)}
<strong>Name of the student in full</strong> ${createField('(Name)', student.name, 20)} ${createField("(Father's Name)", student.fathersName, 20)}
                                        ${createField('(Surname)', student.surname, 30)}
${createField("Mother's Name", student.mothersName, 40)}
${createField('Nationality', student.nationality || 'Indian', 20)} ${createField('Mother tongue', student.motherTongue, 40)}
${createField('Religion', student.religion, 15)} ${createField('Caste', student.caste, 20)} ${createField('Sub-caste', student.subCaste, 25)}
${createField('Place of Birth', student.placeOfBirth, 10)} ${createField('Taluka', student.taluka, 10)} ${createField('Dist', student.district, 10)} ${createField('State', student.state, 12)} <strong>Country:</strong> India
${createField('Date of Birth (DD/MM/YY) according to the Christian era', formatDate(student.dateOfBirth), 34)}
${createField('Date of Birth (In words)', dateOfBirthInWords, 64)}
<strong>Last school attended & standard:</strong>${createField('', student.lastAttendedSchool, 55)}
${createField('', student.lastSchoolStandard, 85)}
${createField('Date of admission in this school', formatDate(student.dateOfAdmission), 24)} ${createField('Standard', student.admissionStandard, 25)}
${createField('Progress', student.progress, 33)} ${createField('Conduct', student.conduct, 35)}
${type === 'leave' ? createField('Date of leaving school', formatDate(student.dateOfLeaving), 65) : ''}
${createField('Standard in which studying and since when (in words and figure)', student.currentStandard, 85)}
${type === 'leave' ? createField('Reason of leaving school', student.reasonOfLeaving, 64) : ''}
${createField('Remarks', student.remarks, 78)}
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
}

const generatePDF = async (html, isDraft) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the content of the page
  await page.setContent(html, { waitUntil: 'networkidle0' })

  // If it's a draft, add a watermark
  if (isDraft) {
    await page.evaluate(() => {
      const watermark = document.createElement('div')
      watermark.innerHTML = 'DRAFT'
      watermark.style.position = 'absolute'
      watermark.style.top = '50%'
      watermark.style.left = '50%'
      watermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)'
      watermark.style.fontSize = '100px'
      watermark.style.color = 'rgba(200, 200, 200, 0.5)'
      watermark.style.pointerEvents = 'none'
      document.body.appendChild(watermark)
    })
  }

  // Generate PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  })

  await browser.close()

  return pdf
}

export const generateLeaveCertificate = async (student, isDraft = true) => {
  const serialNumber = getNextLeaveCertificateNumber()
  const html = generateCertificateHTML(student, 'leave', serialNumber, isDraft)
  return generatePDF(html, isDraft)
}

export const generateBonafideCertificate = async (student, isDraft = true) => {
  const serialNumber = getNextBonafideCertificateNumber()
  const html = generateCertificateHTML(student, 'bonafide', serialNumber, isDraft)
  return generatePDF(html, isDraft)
}
