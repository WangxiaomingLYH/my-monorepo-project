111111111111

在组件库项目中, 安装 element-plus vue, 然后正常的写组件, 最后在 index.ts 文件中注册为全局组件

但如果你有多个项目共享，推荐放在 peerDependencies 里. 这样不会在每个项目里都安装一份 Vue 或 Element Plus，避免版本冲突。

虽然你通过 app.component(name, component) 注册了全局组件，但：

👉 仅限于在模板中 <ElButton /> 直接使用。
👉 如果你想在脚本里按需导入组件，就必须要通过 export { ElButton }。