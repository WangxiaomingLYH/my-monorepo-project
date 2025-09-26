// 在 tsconfig.json 中开启了 NodeNext + ESM 模式，这就要求你在 import/export 时写真实的 .js 扩展名，即使你源代码是 .ts

export { add } from "./modules/test.js"
export { default as vCopy } from "./modules/v-copy.js"