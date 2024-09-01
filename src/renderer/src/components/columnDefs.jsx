// src/renderer/src/components/columnDefs.js

import { ActionCellRenderer } from './ActionCellRenderer'

export const columnDefs = [
  {
    headerName: '',
    width: 50,
    cellRenderer: ActionCellRenderer,
    cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    sortable: false,
    filter: false,
    pinned: 'left'
  },
  {
    field: 'studentId',
    headerName: 'Student ID',
    editable: true
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: true
  },
  {
    field: 'surname',
    headerName: 'Surname',
    editable: true
  },
  {
    field: 'dateOfBirth',
    headerName: 'Date of Birth',
    editable: true
  },
  {
    field: 'admissionStandard',
    headerName: 'Admission Standard',
    editable: true
  },
  {
    field: 'currentStandard',
    headerName: 'Current Standard',
    editable: true
  },
  {
    field: 'aadharNo',
    headerName: 'Aadhar No',
    editable: true
  },
  {
    field: 'fathersName',
    headerName: "Father's Name",
    editable: true
  },
  {
    field: 'mothersName',
    headerName: "Mother's Name",
    editable: true
  },
  {
    field: 'religion',
    headerName: 'Religion',
    editable: true
  },
  {
    field: 'caste',
    headerName: 'Caste',
    editable: true
  },
  {
    field: 'subCaste',
    headerName: 'Sub-Caste',
    editable: true
  },
  {
    field: 'placeOfBirth',
    headerName: 'Place of Birth',
    editable: true
  },
  {
    field: 'taluka',
    headerName: 'Taluka',
    editable: true
  },
  {
    field: 'district',
    headerName: 'District',
    editable: true
  },
  {
    field: 'state',
    headerName: 'State',
    editable: true
  },
  {
    field: 'lastAttendedSchool',
    headerName: 'Last Attended School',
    editable: true
  },
  {
    field: 'lastSchoolStandard',
    headerName: 'Last School Standard',
    editable: true
  },
  {
    field: 'dateOfAdmission',
    headerName: 'Date of Admission',
    editable: true
  },
  {
    field: 'progress',
    headerName: 'Progress',
    editable: true
  },
  {
    field: 'conduct',
    headerName: 'Conduct',
    editable: true
  },
  {
    field: 'dateOfLeaving',
    headerName: 'Date of Leaving',
    editable: true
  },
  {
    field: 'reasonOfLeaving',
    headerName: 'Reason of Leaving',
    editable: true
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    editable: true
  },
  {
    field: 'motherTongue',
    headerName: 'Mother Tongue',
    editable: true
  },
  {
    field: 'ten',
    headerName: 'TEN',
    editable: true
  },
  {
    field: 'grn',
    headerName: 'GRN',
    editable: true
  },
  {
    field: 'certGenCount',
    headerName: 'Cert Gen Count',
    editable: true
  }
]

export const defaultColDef = {
  sortable: true,
  resizable: true,
  width: 120,
  editable: true,
  filter: false // Disable column-specific filters
}
