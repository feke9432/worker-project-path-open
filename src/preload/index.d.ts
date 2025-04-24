import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openInStatic: (options: { directory?: string }) => void
      openInVSCode: (options: { directory?: string; file?: string }) => void
      switch: (options: string[]) => void
    }
  }
}
