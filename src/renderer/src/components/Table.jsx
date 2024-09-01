import React, { useEffect, useRef } from 'react'
import { createGrid } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const Table = ({ rowData, columnDefs, onCellValueChanged, onGridReady }) => {
  const gridRef = useRef(null)
  const gridApiRef = useRef(null)

  useEffect(() => {
    if (gridRef.current && !gridApiRef.current) {
      const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        defaultColDef: {
          flex: 1,
          minWidth: 100,
          editable: true
        },
        onCellValueChanged: onCellValueChanged
      }

      gridApiRef.current = createGrid(gridRef.current, gridOptions)

      if (onGridReady) {
        onGridReady(gridApiRef.current)
      }
    }
  }, [])

  useEffect(() => {
    console.log('rowData in Table component:', rowData)
    if (gridApiRef.current) {
      console.log('Updating grid data in Table component')
      gridApiRef.current.setGridOption('rowData', rowData)
    }
  }, [rowData])

  return <div ref={gridRef} className="ag-theme-alpine" style={{ height: 400, width: '100%' }} />
}

export default Table
