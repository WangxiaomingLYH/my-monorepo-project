预加载脚本目录

1. 预加载脚本向渲染进程通信

```ts
import { contextBridge } from 'electron'
const api = {
    title:'wxm'
}
contextBridge.exposeInMainWorld('api', api)
```
> 渲染进程: `console.log(window.api,"@api")  ===> { title:'wxm' }`