import React, { useState, useCallback, useEffect } from 'react'
import AdvancedTable from '../components/AdvancedTable'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const easeInVariants = {
  hidden: { opacity: 0, x: -250 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.1 } }
}

const Home = ({ quickFilterText, refreshTrigger }) => {
  const [rowData, setRowData] = useState([])

  const fetchStudents = useCallback(async () => {
    try {
      const result = await window.api.getStudents()
      if (result.success) {
        setRowData(result.data)
        toast.success('Students fetched successfully!')
      } else {
        console.error('Failed to fetch students:', result.error)
        toast.error('Failed to fetch students:', result.error)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
      toast.error('Error fetching students:', error.message)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents, refreshTrigger])

  const onCellValueChanged = useCallback(
    async (event) => {
      const { data: updatedStudent } = event
      try {
        const result = await window.api.updateStudent(updatedStudent)
        if (result.success) {
          setRowData((prevRowData) =>
            prevRowData.map((row) => (row.id === updatedStudent.id ? updatedStudent : row))
          )
          toast.success('Student updated successfully!')
        } else {
          console.error('Failed to update student:', result.error)
          toast.error('Failed to update student:', result.error)
          fetchStudents()
        }
      } catch (error) {
        console.error('Error updating student:', error)
        toast.error('Error updating student:', error.message)
        fetchStudents()
      }
    },
    [fetchStudents]
  )

  return (
    <motion.div
      className="h-full flex flex-col"
      initial="hidden"
      animate="visible"
      variants={easeInVariants}
    >
      <div className="flex-grow p-4">
        <AdvancedTable
          rowData={rowData}
          setRowData={setRowData}
          onCellValueChanged={onCellValueChanged}
          quickFilterText={quickFilterText}
        />
      </div>
    </motion.div>
  )
}

export default Home
