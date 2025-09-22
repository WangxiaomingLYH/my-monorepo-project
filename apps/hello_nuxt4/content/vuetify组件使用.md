---
title: vuetify组件记忆点
---

## 选择器
1. 使用 v-data-picker 做日期选择器
    - 通过属性 multiple="range" 选择日期范围, 选中的是开始到结尾内所有的日期

## 通知
1. 用 v-snackbar 代替 message
    - 使用 location 属性改变消息条的出现方向
2. 用 v-snackbar-queue 做消息条队列, 只有当 v-model 的值变化时才会开始弹出

## 按钮
1. 很多组件有响应按钮, 根据具体情况而视
2. 可以通过 v-btn-toggle 组件创建一排同风格的按钮

## form 表单
1. 和 element 的差别不是很大
2. 需要注意, input 的基础实现是 v-text-field 即可

## table表格组件
1. 普通表格使用 v-table; 带分页的表格选择 v-data-table; 大数据无分页的表格选择 v-data-table-virtual; 若数据来自API则选择 v-data-table-server(排序功能需要后端进行处理, 完全排序)
2. 常用属性
    - headers: 表头数据配置项
    - items: 表格数据配置项
    - item-value: 每行内容的唯一标识符
    - show-select: 展示选中框
    - v-model: 收集每行内容的唯一标识符
    - return-object: 将数据属性全部暴露, 通过 v-model 收集的将是全部属性
    - v-model:items-per-page: 每页展示的数据量, 相当于 pagesize
    - :items-length="totalItems": 总数量, 相当于 total
    - :loading='loading': 加载中
3. 表头配置项
    - title: string;     // 表头展示文本
    - key: string;  // 对应的 items 中的字段名
    - align?: 'start' | 'center' | 'end';   // 可选，对齐方式
    - sortable?: boolean;   // 是否可排序
    - width?: number | string;  // 列宽度
    - minWidth?: number | string;
    - maxWidth?: number | string;
    - fixed?: boolean | 'start' | 'end';  // 固定列
    - nowrap?: boolean; // 单元格文本是否不换行, 超出部分显示为 ...
    - headerProps?: Record<string, any>;    // 向表头单元格传递额外的 html 属性(class style)等
    - sort?: DataTableCompareFunction;  // 自定义排序逻辑
    - filter?: FilterFunction;  // 自定义过滤逻辑
    - children?: DataTableHeader<T>[];  // 子项目
4. 注意项
    - value 属性的优先级比 key 高
    - v-data-table-virtual: 虚拟表, 使用虚拟化技术只渲染一小部分行, 支持客户端排序和过滤，但不支持分页
    - 若要使用来自API的数据，请监听 @update:options 事件以知道何时获取新数据。 使用 loading 在获取数据时显示进度栏
5. 表单搜索功能
    - 通过 search 属性开启: :search="search"
    - 然后表格会自动搜索包含 search 的数据, search:string