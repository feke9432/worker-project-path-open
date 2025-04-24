import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { exec } from 'child_process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1000,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('open-in-vscode', (_event, { directory, file }) => {
    openInVSCode(directory, file)
  })

  ipcMain.on('open-in-static', (_event, { directory }) => {
    openInVStatic(directory)
  })

  // 在 IPC 监听器部分添加新的处理程序
  ipcMain.on('copy-files', (_event, directories: string[]) => {
    const [sourceDir, targetDir] = directories
    try {
      // 递归复制并覆盖已有文件
      fs.cpSync(sourceDir, targetDir, {
        recursive: true,
        force: true,
        errorOnExist: false
      })
      console.log(`文件已成功从 ${sourceDir} 复制到 ${targetDir}`)
      openInVStatic(targetDir)
    } catch (error) {
      if (error instanceof Error) {
        console.error(`复制失败: ${error.message}`);
      } else {
        console.error(`复制失败: 发生未知错误`);
      }
    }
  })
})

function openInVSCode(directory: string, file?: string) {
  const vscodePath = 'code' // 默认 VSCode 的命令行工具
  console.log('main', directory, file)

  let command = `${vscodePath} "${directory}"`
  if (file) {
    command += ` "${file}"`
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening directory and file in VSCode: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Error opening directory and file in VSCode: ${stderr}`)
      return
    }
    console.log(`Directory and file opened in VSCode: ${stdout}`)
  })
}

async function openInVStatic(fullPath: string) {
  try {
    fullPath = fullPath.replaceAll('/', '\\')
    console.log('openInVStatic', fullPath)
    let command: string
    switch (process.platform) {
      case 'win32':
        command = `explorer "${fullPath}"`
        break
      case 'darwin':
        command = `open "${fullPath}"`
        break
      default:
        command = `xdg-open "${fullPath}"`
    }

    exec(command, (error) => {
      if (error) {
        console.error(`Failed to open directory: ${error.message}`)
      }
    })
  } catch (error) {
    console.error(`Error accessing path: ${error}`)
  }

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
