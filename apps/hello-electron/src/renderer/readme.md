渲染进程目录

1. 渲染进程向主进程传递数据 使用 `send on` api

```ts
const data = {
  name: 'wxm'
}
const saveFileBtn = () => {
  window.electron.ipcRenderer.send("save-file", data)
}
```

主进程接收

```ts
event: 类似于js方法中的 event
data: 传递的数据
ipcMain.on("save-file", (event, data) => {
    console.log('save-file')
    console.log(event, '@event')
    console.log(data, '@data')
})
```