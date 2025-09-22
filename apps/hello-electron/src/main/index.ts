import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs/promises'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),  // 加载预加载脚本
      sandbox: false,
      // 安全：关闭 nodeIntegration，启用 contextIsolation; 把本地系统访问放在主进程或 preload 中
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  // 主进程向渲染进程通信
  mainWindow.webContents.send('main-message', { status: 'ok' });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于electronic-vite-cli的渲染器HMR
  // 加载用于开发的远程URL或用于生产的本地html文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// 当Electron完成时，将调用此方法
// 初始化并准备创建浏览器窗口
// 某些API只能在此事件发生后使用
app.whenReady().then(() => {
  // 为windows设置应用程序用户模型id
  electronApp.setAppUserModelId('com.electron')

  // 开发中默认按F12打开或关闭DevTools
  // 在生产中忽略CommandOrControl+R。
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on("save-file", (event, data) => {
    console.log('save-file')
    console.log(event, '@event')
    console.log(data, '@data')
  })

  // 打开选择 epub 文件的 IPC; 我们通过 ipcMain.handle 提供受控的“打开文件并读取”操作，而不是把 fs 暴露给渲染器——避免渲染器直接操作文件系统带来风险
  ipcMain.handle('dialog:openEpub', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'EPUB', extensions: ['epub'] }],
    })
    if (canceled || !filePaths[0]) return null
    const buf = await fs.readFile(filePaths[0])
    // 返回 base64 （可通过 IPC 传回渲染器）
    return { filename: path.basename(filePaths[0]), data: buf.toString('base64') }
  })

  createWindow()

  app.on('activate', function () {
    // 在macOS上，当出现以下情况时，通常会在应用程序中重新创建窗口
    // 单击dock图标后，没有其他打开的窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭所有窗口后退出，macOS除外。在那里，这很常见
// 让应用程序及其菜单栏保持活动状态，直到用户退出
// 显式使用Cmd+Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，您可以包含应用程序的其他特定主进程
// 代码。您也可以将它们放在单独的文件中，并在此处要求它们。
