## 封装的 Table 组件

**思路:**
1. 使用配置项的方式生成模板, 用到 component 的 is 属性, 可以很方便的渲染 input select 等组件
2. 但是如果需要渲染嵌套组件, 例如 tooltip 包裹住的 button 组件, 就需要递归渲染, 所以选择把 component 封装成递归组件

**实现方式:**
1. 使用 v-for 循环配置项, 使用 component 渲染组件, 使用 v-bind 绑定属性, 通过判断配置项是否有 child 来确认是否需要使用递归调用组件. 使用 `#default={row}`, 解构出当前组件的数据 row, 在使用递归调用租价时, 传递 row
2. 如果需要递归调用, 则通过 props 传递 child row propName 等属性
3. 在递归调用组件中, 还是通过 v-bind 绑定属性, 还是通过判断是否有 child 来确认是否再次递归调用自己. 如果需要, 则还是传递 child row propName 等属性; 如果不需要, 则渲染 innerHTML 或 row[propName]
4. 有些组件如 ElTooltip 需要根据 row 设置 content, 也就是说需要动态获取数据, 这样就需要函数的方式判断传递的 props 是不是方法, 如果是就调用并传递数据
    - 如果选择使用插槽的方式, 则需要在模板中手动写入插槽, 不利于维护
    - 此时的 row 已经透传给了递归组件, 所以可以在递归组件中将数据返回给使用者. 实现方式是使用者传一个函数给递归组件, 递归组件调用该方法, 并传递 row 属性
5. 典型的调用者配置项
```ts
{
    label: 'Id',
    prop: 'appId',
    child: {
        type: ElTooltip,
        props: {
            effect: "dark",
            placement: "top",
            // 通过传递方法的形式, 拿到  row, 然后处理 row
            content: (row: any, name: string) => `应用ID是：${row.appId}, name 是: ${name}`,
        },
        slots: {
            name: 'content'
        },
        child: {
            type: ElButton,
            props: {
                link: true,
                type: 'primary'
            }
        },
    }
},
```