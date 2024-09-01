import React from 'react'
import { MoreVertical, Trash2, Award, Edit, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

// Motion variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 0.8,
      delayChildren: 0.1,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    x: -20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 }
}

const iconVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeOut', duration: 0.2 } },
  exit: { opacity: 0, x: -20, transition: { ease: 'easeIn', duration: 0.2 } }
}

// Motion components
const MotionMoreVertical = motion(MoreVertical)
const MotionAward = motion(Award)
const MotionTrash2 = motion(Trash2)
const MotionEdit = motion(Edit)
const MotionFileText = motion(FileText)

export const ActionCellRenderer = (params) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    console.log('Delete clicked for row:', params.data)
    try {
      const result = await window.api.deleteStudent(params.data.studentId)
      if (result.success) {
        toast.success(
          'Student Deleted',
          'The student has been successfully deleted from the database.'
        )
        params.api.applyTransaction({ remove: [params.data] })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error deleting student:', error)
      toast.error('Error', 'There was an error deleting the student. Please try again.')
    }
  }

  const handleGenerateLeaveCertificate = async () => {
    try {
      const result = await window.api.generateLeaveCertificate(params.data.studentId)
      if (result.success) {
        toast.success(
          'Leave Certificate Generated',
          'The leave certificate has been generated and saved.'
        )
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error generating leave certificate:', error)
      toast.error('Error', 'There was an error generating the leave certificate. Please try again.')
    }
  }

  const handleGenerateBonafideCertificate = async () => {
    try {
      const result = await window.api.generateBonafideCertificate(params.data.studentId)
      if (result.success) {
        toast.success(
          'Bonafide Certificate Generated',
          'The bonafide certificate has been generated and saved.'
        )
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error generating bonafide certificate:', error)
      toast.error(
        'Error',
        'There was an error generating the bonafide certificate. Please try again.'
      )
    }
  }

  const handleEdit = () => {
    navigate('/add-student', { state: { studentData: params.data } })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MotionMoreVertical
            className="h-4 w-4 text-gray-500"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            exit="exit"
          />
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        <DropdownMenuContent side="right" align="start" sideOffset={5} className="w-56" asChild>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <DropdownMenuItem asChild onClick={handleEdit}>
              <motion.div variants={itemVariants} className="flex items-center cursor-pointer">
                <MotionEdit
                  className="mr-2 h-4 w-4 text-gray-500"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
                <span>Edit</span>
              </motion.div>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <motion.div variants={itemVariants} className="flex items-center cursor-pointer">
                  <MotionAward
                    className="mr-2 h-4 w-4 text-gray-500"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  />
                  <span>Generate Certificate</span>
                </motion.div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={handleGenerateLeaveCertificate}>
                  <motion.div variants={itemVariants} className="flex items-center cursor-pointer">
                    <MotionFileText
                      className="mr-2 h-4 w-4 text-gray-500"
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                    />
                    <span>Leave Certificate</span>
                  </motion.div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleGenerateBonafideCertificate}>
                  <motion.div variants={itemVariants} className="flex items-center cursor-pointer">
                    <MotionFileText
                      className="mr-2 h-4 w-4 text-gray-500"
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                    />
                    <span>Bonafide Certificate</span>
                  </motion.div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem asChild onClick={handleDelete}>
              <motion.div
                variants={itemVariants}
                className="flex items-center cursor-pointer text-red-600"
              >
                <MotionTrash2
                  className="mr-2 h-4 w-4"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                />
                <span>Delete</span>
              </motion.div>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  )
}
