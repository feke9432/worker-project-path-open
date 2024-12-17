import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openInVSCode: (data: { directory: string; file?: string }) => {
    ipcRenderer.send('open-in-vscode', data)
  },
  downloadFile: () => {
    ipcRenderer.send('download-file', './resources/example.xls')

    ipcRenderer.on('download-success', (event, savePath) => {
      console.log('File downloaded successfully to:', savePath)
      alert(`File downloaded successfully to: ${savePath}`)
    })

    ipcRenderer.on('download-error', (event, errorMessage) => {
      console.error('Error downloading file:', errorMessage)
      alert(`Error downloading file: ${errorMessage}`)
    })
  }
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
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
