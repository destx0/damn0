import React, { useState, useCallback, useEffect } from 'react'
import AdvancedTable from '@/components/AdvancedTable'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RefreshCw } from 'lucide-react'
import NavMenu from '@/components/NavMenu'

const easeInVariants = {
  hidden: { opacity: 0, x: -250 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.1 } }
}

const iconVariants = {
  hover: { scale: 1.2, transition: { type: 'spring', stiffness: 300 } },
  tap: { scale: 0.8, transition: { type: 'spring', stiffness: 300 } }
}

const TablePage = () => {
  const [rowData, setRowData] = useState([])
  const [quickFilterText, setQuickFilterText] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

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

  const handleQuickFilterChange = useCallback((event) => {
    setQuickFilterText(event.target.value)
  }, [])

  const handleRefresh = useCallback(() => {
    setIsRotating(true)
    setRefreshTrigger((prev) => prev + 1)
    setTimeout(() => setIsRotating(false), 1000) // Rotate for 1 second
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <header className="flex-shrink-0 w-full border-b bg-background z-50 bg-gray-200">
        <div className="container flex h-16 items-center space-x-4">
          <NavMenu />
          <div className="flex-grow"></div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Quick filter..."
              value={quickFilterText}
              onChange={handleQuickFilterChange}
              className="pl-10 pr-4 py-2 w-64"
            />
            <motion.div whileHover="hover" whileTap="tap" variants={iconVariants}>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </motion.div>
          </div>
          <motion.div whileHover="hover" whileTap="tap" variants={iconVariants}>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw size={18} className={isRotating ? 'rotate-animation' : ''} />
              <span>Refresh</span>
            </Button>
          </motion.div>
        </div>
      </header>
      <motion.div
        className="flex-grow p-4 overflow-auto"
        initial="hidden"
        animate="visible"
        variants={easeInVariants}
      >
        <AdvancedTable
          rowData={rowData}
          setRowData={setRowData}
          onCellValueChanged={onCellValueChanged}
          quickFilterText={quickFilterText}
        />
      </motion.div>
    </div>
  )
}

export default TablePage
