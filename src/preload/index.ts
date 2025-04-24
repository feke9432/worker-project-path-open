import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openInVSCode: (data: { directory: string; file?: string }) => {
    ipcRenderer.send('open-in-vscode', data)
  },
  openInStatic: (data: { directory: string; file?: string }) => {
    ipcRenderer.send('open-in-static', data)
  },
  switch: (data: string[]) => {
    ipcRenderer.send('copy-files', data)
    console.log(data)
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
