import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { initialFormData } from './formData'
import { formContainerVariants, formItemVariants } from './animationVariants'
import { renderField } from './FormFields'
import { ActionButtons } from './ActionButtons'

const AddStudent = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [customInputs, setCustomInputs] = useState({
    progress: false,
    conduct: false,
    remarks: false,
    reasonOfLeaving: false
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.studentData) {
      setFormData(location.state.studentData)
      setIsEditMode(true)
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (name, value) => {
    if (value === 'custom') {
      setCustomInputs((prev) => ({ ...prev, [name]: true }))
      setFormData((prevData) => ({ ...prevData, [name]: '' }))
    } else {
      setCustomInputs((prev) => ({ ...prev, [name]: false }))
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleDateChange = (name, dateValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: dateValue.startDate
    }))
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <Card className="h-full flex flex-col relative overflow-hidden">
        <CardHeader>
          <motion.div variants={formItemVariants} initial="hidden" animate="visible">
            <CardTitle>{isEditMode ? 'Edit Student' : 'Add Student'}</CardTitle>
            <CardDescription>
              {isEditMode
                ? "Edit the student's details below. Use the date picker for date fields and select options where available."
                : "Enter the student's details below. Use the date picker for date fields and select options where available."}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full p-4">
            <motion.form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.keys(formData).map(
                (field) =>
                  field !== 'id' && (
                    <motion.div key={field} className="space-y-2" variants={formItemVariants}>
                      {renderField(
                        field,
                        formData,
                        handleChange,
                        handleSelectChange,
                        handleDateChange,
                        customInputs
                      )}
                    </motion.div>
                  )
              )}
            </motion.form>
          </ScrollArea>
        </CardContent>
        <div className="absolute bottom-6 right-6 p-4">
          <ActionButtons
            isEditMode={isEditMode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            formData={formData}
            navigate={navigate}
          />
        </div>
      </Card>
    </div>
  )
}

export default AddStudent
