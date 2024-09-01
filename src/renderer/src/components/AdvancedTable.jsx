// src/renderer/src/components/AdvancedTable.js

import React, { useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import '@/assets/ag.css'
import { columnDefs, defaultColDef } from './columnDefs'

const AdvancedTable = ({ rowData, setRowData, onCellValueChanged, quickFilterText }) => {
  const [columnDefinitions] = useState(columnDefs)

  const handleCellValueChanged = useCallback(
    (event) => {
      console.log('Cell value changed:', event)
      onCellValueChanged(event)
    },
    [onCellValueChanged]
  )

  return (
    <div className="ag-theme-quartz w-full h-full text-sm">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefinitions}
        defaultColDef={defaultColDef}
        onCellValueChanged={handleCellValueChanged}
        domLayout="normal"
        rowSelection={'multiple'}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        headerHeight={32}
        rowHeight={32}
        quickFilterText={quickFilterText}
      />
    </div>
  )
}

export default AdvancedTable
