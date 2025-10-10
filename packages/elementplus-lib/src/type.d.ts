declare module '*.vue' {
  import { DefineComponent } from 'vue'

  // DefineComponent<{}, {}, any>: 定义为 vue 组件的基础类型
  

  // 修改类型，确保 Vue 组件有正确的类型推导
  const component: DefineComponent<{}, {}, any> & {
    // 通过这个方式让 TypeScript 可以识别 Vue 组件的类型
    props?: Record<string, any>;
  }

  export default component;
}
