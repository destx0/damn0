// src/renderer/src/components/ImportExportCard.jsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Download, Upload, FileInput } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

const container = {
  hidden: { y: -100, opacity: 0, scale: 0.2 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.01,
      staggerChildren: 0.01
    }
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
}

const item = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 }
}

const iconVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
  hidden: { opacity: 0, y: -250 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeIn', duration: 0.1 } },
  exit: { opacity: 0, y: 250, transition: { ease: 'easeOut', duration: 0.1 } }
}

const ImportExportCard = () => {
  const handleImport = async () => {
    try {
      const result = await window.api.openFileDialog()
      if (result.canceled) {
        toast.info('Import cancelled')
        return
      }
      const filePath = result.filePaths[0]
      const importResult = await window.api.importFileAndSave(filePath)
      if (importResult.success) {
        toast.success('File imported and data saved successfully!')
      } else {
        toast.error(`Failed to import and save file: ${importResult.error}`)
      }
    } catch (error) {
      console.error('Import error:', error)
      toast.error(`Failed to import and save file: ${error.message}`)
    }
  }

  const handleExport = async () => {
    try {
      const result = await window.api.getStudents()
      if (result.success) {
        const headers = [
          'id',
          'studentId',
          'aadharNo',
          'name',
          'surname',
          'fathersName',
          'mothersName',
          'religion',
          'caste',
          'subCaste',
          'placeOfBirth',
          'taluka',
          'district',
          'state',
          'dateOfBirth',
          'lastAttendedSchool',
          'lastSchoolStandard',
          'dateOfAdmission',
          'admissionStandard',
          'progress',
          'conduct',
          'dateOfLeaving',
          'currentStandard',
          'reasonOfLeaving',
          'remarks',
          'motherTongue',
          'ten',
          'grn',
          'certGenCount'
        ]

        const csvContent = result.data
          .map((student) =>
            headers
              .map((header) => {
                let value = student[header]
                // Keep date values as strings
                if (typeof value === 'string') {
                  return `"${value.replace(/"/g, '""')}"`
                }
                return value
              })
              .join(',')
          )
          .join('\n')

        const exportResult = await window.api.saveFileDialog(`${headers.join(',')}\n${csvContent}`)
        if (exportResult.success) {
          toast.success('File exported successfully!')
        } else {
          toast.error(
            `File export was cancelled or failed: ${exportResult.reason || exportResult.error}`
          )
        }
      } else {
        toast.error(`Failed to export file: ${result.error}`)
      }
    } catch (error) {
      console.error('Export error:', error)
      toast.error(`Failed to export file: ${error.message}`)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="w-[400px]"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                variants={iconVariants}
              >
                <FileInput className="h-5 w-5" />
              </motion.div>
              <span>Import/Export</span>
            </CardTitle>
            <CardDescription>Manage your student data</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <motion.div className="grid gap-2" variants={item}>
              <Label htmlFor="importButton" className="text-sm font-medium">
                Import File
              </Label>
              <Button
                id="importButton"
                onClick={handleImport}
                className="flex items-center justify-center w-full"
                variant="outline"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                >
                  <Upload className="mr-2 h-4 w-4" />
                </motion.div>
                Import CSV/XLSX
              </Button>
              <p className="text-xs text-muted-foreground">
                Import student data from a CSV or XLSX file
              </p>
            </motion.div>

            <Separator />

            <motion.div className="grid gap-2" variants={item}>
              <Label htmlFor="exportButton" className="text-sm font-medium">
                Export Data
              </Label>
              <Button
                id="exportButton"
                onClick={handleExport}
                className="flex items-center justify-center w-full"
                variant="outline"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconVariants}
                >
                  <Download className="mr-2 h-4 w-4" />
                </motion.div>
                Export to CSV
              </Button>
              <p className="text-xs text-muted-foreground">Export all student data to a CSV file</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImportExportCard
