// src/renderer/src/hooks/useGenerateCertificate.js
import { useState, useCallback } from 'react'
import { toast } from 'sonner'

const createDataUrl = (base64Data) => {
  return `data:application/pdf;base64,${base64Data}`
}

export const useGenerateCertificate = () => {
  const [pdfDataUrl, setPdfDataUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateCertificate = useCallback(async (studentId) => {
    setIsLoading(true)
    try {
      const result = await window.api.generateCertificate(studentId)
      if (!result.success) {
        throw new Error(result.error)
      }
      const dataUrl = createDataUrl(result.pdfBase64)
      setPdfDataUrl(dataUrl)
      toast.success(
        'Certificate Generated',
        `The comprehensive A4 certificate has been generated. Certificate count: ${result.data.certGenCount}`
      )
      return result.data
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast.error('Error', 'There was an error generating the certificate. Please try again.')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const closePdfPreview = useCallback(() => {
    setPdfDataUrl(null)
  }, [])

  return {
    pdfDataUrl,
    isLoading,
    generateCertificate,
    closePdfPreview
  }
}
