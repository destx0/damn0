// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  importFileAndSave: (filePath) => ipcRenderer.invoke('import-file-and-save', filePath),
  saveFileDialog: (content) => ipcRenderer.invoke('save-file-dialog', content),
  getStudents: () => ipcRenderer.invoke('get-students'),
  addStudent: (student) => ipcRenderer.invoke('add-student', student),
  updateStudent: (student) => ipcRenderer.invoke('update-student', student),
  deleteStudent: (studentId) => ipcRenderer.invoke('delete-student', studentId),
  generateLeaveCertificate: (studentId, isDraft) =>
    ipcRenderer.invoke('generate-leave-certificate', studentId, isDraft),
  generateBonafideCertificate: (studentId, isDraft) =>
    ipcRenderer.invoke('generate-bonafide-certificate', studentId, isDraft),
  saveCertificate: (tempPath, studentName) =>
    ipcRenderer.invoke('save-certificate', tempPath, studentName)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
