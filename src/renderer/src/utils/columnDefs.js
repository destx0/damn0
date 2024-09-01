import generateCertificate from '../components/generateCertificate'

const columnDefs = [
  { field: 'id', headerName: 'ID', editable: false },
  { field: 'studentId', headerName: 'Student ID', editable: true },
  { field: 'aadharNo', headerName: 'Aadhar No', editable: true },
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'surname', headerName: 'Surname', editable: true },
  { field: 'fathersName', headerName: "Father's Name", editable: true },
  { field: 'mothersName', headerName: "Mother's Name", editable: true },
  { field: 'religion', headerName: 'Religion', editable: true },
  { field: 'caste', headerName: 'Caste', editable: true },
  { field: 'subCaste', headerName: 'Sub-Caste', editable: true },
  { field: 'placeOfBirth', headerName: 'Place of Birth', editable: true },
  { field: 'taluka', headerName: 'Taluka', editable: true },
  { field: 'district', headerName: 'District', editable: true },
  { field: 'state', headerName: 'State', editable: true },
  { field: 'dateOfBirth', headerName: 'Date of Birth', editable: true },
  { field: 'lastAttendedSchool', headerName: 'Last Attended School', editable: true },
  { field: 'lastSchoolStandard', headerName: 'Last School Standard', editable: true },
  { field: 'dateOfAdmission', headerName: 'Date of Admission', editable: true },
  { field: 'admissionStandard', headerName: 'Admission Standard', editable: true },
  { field: 'progress', headerName: 'Progress', editable: true },
  { field: 'conduct', headerName: 'Conduct', editable: true },
  { field: 'dateOfLeaving', headerName: 'Date of Leaving', editable: true },
  { field: 'currentStandard', headerName: 'Current Standard', editable: true },
  { field: 'reasonOfLeaving', headerName: 'Reason of Leaving', editable: true },
  { field: 'remarks', headerName: 'Remarks', editable: true },
  {
    headerName: 'Actions',
    cellRenderer: (params) => {
      const button = document.createElement('button')
      button.innerText = 'Generate Certificate'
      button.addEventListener('click', () => generateCertificate(params.data))
      return button
    }
  }
]

export default columnDefs
