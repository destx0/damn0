// src/renderer/src/components/generateCertificate.js
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner'
import PDFPreview from '@/components/PDFPreview'

const createDataUrl = (base64Data) => {
  return `data:application/pdf;base64,${base64Data}`
}

const GenerateCertificate = ({ student }) => {
  const [pdfDataUrl, setPdfDataUrl] = useState(null)

  const generateCertificate = useCallback(async () => {
    try {
      const result = await window.api.generateCertificate(student.studentId)
      if (!result.success) {
        throw new Error(result.error)
      }
      const dataUrl = createDataUrl(result.pdfBase64)
      setPdfDataUrl(dataUrl)
      toast.success(
        'Certificate Generated',
        `The comprehensive A4 certificate has been generated. Certificate count: ${result.data.certGenCount}`
      )
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast.error('Error', 'There was an error generating the certificate. Please try again.')
    }
  }, [student])

  const closePdfPreview = () => {
    setPdfDataUrl(null)
  }

  return (
    <>
      <button onClick={generateCertificate}>Generate Certificate</button>
      {pdfDataUrl && <PDFPreview pdfData={pdfDataUrl} onClose={closePdfPreview} />}
    </>
  )
}

export default GenerateCertificate
