import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 渲染器的自定义API
const api = {
  title:111
}

console.log(process,"@process")

// 使用`contextBridge` API将Electron API暴露给
// 仅当启用了上下文隔离时才渲染器，否则
// 只需添加到DOM全局
if (process.contextIsolated) {
  try {
    // 预渲染进程向渲染进程通信
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

// contextBridge.exposeInMainWorld 将受控函数暴露到渲染器 window.electronAPI，而不是直接给渲染器 Node 权限，符合安全最佳实践
contextBridge.exposeInMainWorld('electronAPI', {
  openEpub: async () => {
    // 返回 { filename, data: base64 } 或 null
    return ipcRenderer.invoke('dialog:openEpub')
  }
})