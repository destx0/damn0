import React from 'react'
import { Button } from '@/components/ui/button'
import { UserPlus, UserCheck, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { iconVariants, buttonVariants } from './animationVariants'
import generateCertificate from '@/components/generateCertificate'

export const ActionButtons = ({ isEditMode, isLoading, setIsLoading, formData, navigate }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let result
      if (isEditMode) {
        result = await window.api.updateStudent(formData)
      } else {
        result = await window.api.addStudent(formData)
      }
      if (result.success) {
        toast.success(isEditMode ? 'Student updated successfully!' : 'Student added successfully!')
        navigate('/')
      } else {
        throw new Error(result.error || 'An unknown error occurred')
      }
    } catch (error) {
      console.error('Error adding/updating student:', error)
      toast.error(`Failed to ${isEditMode ? 'update' : 'add'} student: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAndGenerateCertificate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await window.api.addStudent(formData)
      if (result.success && result.id) {
        toast.success('Student added successfully!')
        const updatedStudent = { ...formData, id: result.id }
        await generateCertificate(updatedStudent)
        toast.success('Certificate generated successfully!')
        navigate('/')
      } else {
        throw new Error(result.error || 'Failed to add student')
      }
    } catch (error) {
      console.error('Error adding student or generating certificate:', error)
      toast.error(`Failed to add student or generate certificate: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAndGenerateCertificate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await window.api.updateStudent(formData)
      if (result.success) {
        toast.success('Student updated successfully!')
        await generateCertificate(formData)
        toast.success('Certificate generated successfully!')
        navigate('/')
      } else {
        throw new Error(result.error || 'Failed to update student')
      }
    } catch (error) {
      console.error('Error updating student or generating certificate:', error)
      toast.error(`Failed to update student or generate certificate: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditMode) {
    return (
      <div className="flex flex-col space-y-4">
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
          >
            <motion.div variants={iconVariants}>
              <UserCheck className="mr-2 h-4 w-4" />
            </motion.div>
            <span>{isLoading ? 'Updating...' : 'Update Student'}</span>
          </Button>
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={handleUpdateAndGenerateCertificate}
            disabled={isLoading}
            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
          >
            <motion.div variants={iconVariants}>
              <FileText className="mr-2 h-4 w-4" />
            </motion.div>
            <span>{isLoading ? 'Processing...' : 'Generate Certificate'}</span>
          </Button>
        </motion.div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col space-y-4">
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
          >
            <motion.div variants={iconVariants}>
              <UserPlus className="mr-2 h-4 w-4" />
            </motion.div>
            <span>{isLoading ? 'Adding...' : 'Add Student'}</span>
          </Button>
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={handleAddAndGenerateCertificate}
            disabled={isLoading}
            className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
          >
            <motion.div variants={iconVariants}>
              <FileText className="mr-2 h-4 w-4" />
            </motion.div>
            <span>{isLoading ? 'Processing...' : 'Add and Generate Certificate'}</span>
          </Button>
        </motion.div>
      </div>
    )
  }
}
