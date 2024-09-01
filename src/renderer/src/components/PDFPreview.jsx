import React from 'react'
import { Button } from '@/components/ui/button'

const PDFPreview = ({ pdfData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[80vw] h-[90vh] flex flex-col">
        <iframe src={pdfData} className="w-full h-full mb-4" title="PDF Preview" />
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export default PDFPreview
