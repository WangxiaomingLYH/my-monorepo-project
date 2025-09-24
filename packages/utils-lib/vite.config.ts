import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),  // 库的入口文件
            name: 'WxmUtils',  // 库的全局变量名
            fileName: (format) => `my-lib.${format}.js`,  //  输出文件名
            formats: ['es', 'cjs', 'umd'], // 可按需选择格式
        },
    },
});
