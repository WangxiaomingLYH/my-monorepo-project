---
title: tailwindcss概览
---

# 项目中使用 tailwindcss
1. 需要到 nuxt.config.ts 文件中进行如下配置
    - 在 css 里配置：
        - 全局引入样式文件，在 Nuxt 项目的入口（比如所有页面、组件）都自动加载这份 CSS/SCSS 文件。
        - 文件里的所有类名、标签样式、变量、mixin等，都会直接输出到最终的全局 CSS 文件中，作用于整个项目。
        - 变量和 mixin 并不会自动注入到每个 `<style lang="scss">` 的作用域。如果你在组件的 `<style scoped lang="scss">` 里用 $primary-color 或 @include card-style，还是需要手动 @use 或 @import main.scss。
    - vite.css.preprocessorOptions.scss.additionalData
        - 这会让你在每个 SCSS 文件或 `<style lang="scss">` 自动加上一段内容（比如 @use "~/assets/css/main.scss" as *;）。
        - 变量、mixin、函数等可以在每个组件/SCSS 文件里直接用，无需每次手动引入。
        - 但只在当前 style block/文件内有效，不会自动生成全局 CSS。
        - 如果你在 main.scss 里定义了全局类名，但组件没有写 .my-class {}，组件里 `<div class="my-class">` 样式其实不会生效（除非你单独全局引入 main.scss）
```ts
css: ['~/assets/css/global-class.scss'],  // 让项目可以使用全局类名
vite: {
    css: {
        preprocessorOptions: {
        scss: {
            additionalData: '@use "~/assets/css/main.scss" as *;',  // 让项目可以使用自定义的变量 mixin
        },
        },
    }
},
```
2. 然后创建对应的文件，注意
    - 通过 vite.css.preprocessorOptions.scss.additionalData 导入项目的样式文件里的类名样式不生效
    - 不能重复引用，否则项目会报错，即 main.scss 中不能再次使用 global-class.scss 文件
    - 有的项目会自动生成 @use "@tailwindcss/vite"; 实测添加该句会导致报错

3. 使用方式
```scss
// 在main.scss文件中 定义全局变量
$primary-color: #3498db;

// 在main.scss文件中 定义全局mixin
@mixin card-style {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

// 组件内使用
p {
    background: $primary-color;
    @include card-style;
}


// 在 global-class.scss 文件中定义全局公共类名
.text-tip-style {
    @apply py-1 px-2 ms-2 border rounded text-caption text-disabled;
}
p {
    background-color: $primary-color;  // 能够使用定义的变量
}
```

4. 注意，tailwindcss和vuetify里的类名并不通用，推荐在全局类名文件中，只写tailwindcss的