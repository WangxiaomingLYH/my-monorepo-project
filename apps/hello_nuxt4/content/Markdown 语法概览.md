---
title: Markdown 语法概览
author: WXM
description: "这是文章摘要，会用于 SEO 和文章列表简介"
---

# adsad

markdown教程官网链接: `https://markdown.com.cn/`

# 一个 # 代表为一级标题, 依次递增 1~6

在文字底部标注若干 === 声明为一级标题
===
在文字底部标注若干 --- 声明为二级标题
---

段落语法不推荐使用空格或者tab缩进段落
换行在结尾处添加两个空格  
这样会有一个额外的换行符

**在两侧使用两个 * 号加粗**  
*使用一个星号斜体*  
***使用三个星号加粗且斜体***

>在起始位置使用一个 > 号创建块引用
>
>块引用之间换行, 也需要在空白行前添加 > ,否则会认为是两个块
>> 两个>> 就是嵌套块引用
>
># 块级引用里也支持其他的md语句

1. 列表
1. 列表会转换为有序列表
    在列表中使用 tab 缩进, 内容将成为上一列表的子项
    > 同样也能使用块引用
8. 也就意味着, `1. xxx 1. xxx 3. xxx` 都会转换为 `1. xxx 2. xxx 3.xxx`

---

使用一个或者多个 *** || --- || ___创建分割线, 建议分割线上线两行均添加空白行

链接语法: 使用 [] 包裹文本, 使用 () 包裹链接, 在()里使用引号添加title [比如这个链接](https://www.baidu.com '百度一下你就知道了')
使用尖括号把 url 或者 email 变成可点击的链接
<https://www.baidu.com>

[1][https://www.baidu.com]

图片语法: 要添加图像，请使用感叹号 (!), 然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本

`![这是图片](/assets/img/philly-magic-garden.jpg "Magic Gardens")`

&copy;版权声明

要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列
```ts
| 表头1 | 表头二|
|---|---|
|表内容一|表内容二|
|表内容三|表内容四|

左侧对齐 居中对齐 右侧对齐
`|:---|:---:|---:|`
```

| 表头1 | 表头二|表头三|
|:---|:---:|---:|
|表内容一|表内容二|表内容3|
|表内容三|表内容四|表内容3|

~~使用两个波浪线包裹住删除线的内容~~

- [x] 可以使用`- [x]`的方式定义一个已完成的内容
- [ ] 也可以用`- [ ]`定义为未完成

```ts
通常使用 --- 包裹 markdown 文件里的 YAML Front Matter
---
title: "我的第一篇文章"
author: "小李"
date: 2025-08-13
tags:
  - Markdown
  - YAML
categories:
  - 技术
draft: false
description: "这是文章摘要，会用于 SEO 和文章列表简介"
cover: "/images/banner.jpg"
---

# 正文开始
这是正文内容……

```
| 字段名           | 类型  | 说明          |
| ------------- | --- | ----------- |
| `title`       | 字符串 | 文章标题        |
| `author`      | 字符串 | 作者名         |
| `date`        | 日期  | 发布时间        |
| `tags`        | 数组  | 标签列表        |
| `categories`  | 数组  | 分类列表        |
| `draft`       | 布尔值 | 是否是草稿       |
| `description` | 字符串 | 摘要 / SEO 描述 |
| `cover`       | 字符串 | 封面图片路径      |

# 在markdown中使用 vue 组件
1. nuxt content 会自动识别 components/content/ 目录下的 vue 组件
2. 用 ::组件名称 的方式使用组件
3. 用
  - 基础使用
  ```md
  ::组件名称
  通过插槽传递给给组件的内容
  ::
  ```
  ```vue
  <!-- components/content/Card.vue -->
  <template>
    <slot />  // 这里会接受 md 传递过来的内容
  </template>
  ```

  - 使用具名插槽
  ```md
  ::组件名称
  传递给默认插槽的内容

  #description
  传递给具名插槽的内容
  ::
  ```

  ```vue
  <!-- components/content/Card.vue -->
  <template>
    <slot />
    <slot name="description" />
  </template>
  ```