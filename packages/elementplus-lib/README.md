## ✅ 除了表格和表单，其实这几类也适合封装（按功能划分）

| 类别             | 说明                            | 示例封装价值                       |
| ---------------- | ------------------------------- | ---------------------------------- |
| ✅ 权限组件       | 控制是否渲染 DOM                | `<HasPermission code="user:edit">` |
| ✅ 弹窗模版       | 带确认、自动重置、loading       | `<ConfirmModal />`                 |
| ✅ 表单布局组件   | 快速组合多个字段、自动响应      | `<FormRow :items="fields" />`      |
| ✅ 页面结构框架   | 一致布局、标题、面包屑          | `<PageContainer>`                  |
| ✅ 请求 Hook 封装 | 数据加载、loading、缓存等       | `useTable`, `useFormSubmit`        |
| ✅ 通知系统       | 全局 loading/toast/confirm 封装 | `message.success()`, `useNotify()` |



# 封装 Table 组件

1. 封装的 Table 组件使用  `component :is=''` 的方式, 这种方式不考虑插槽

## 封装一个 ElButtonGrounp 组件

### **思路:**

通过配置项和 v-bind 的方式, 传递 props, 包含 icon type circle loading 等需要的属性

- v-bind 可以用来传递 props, 需要子组件显式声明, 否则会退而求其次当成 HTML 属性

  ```tsx
  // 1. 配置项把
  ```

  

如果有 innerHTML 属性, 就通过 #default 插槽渲染; 通过 v-on(缩写为@) 绑定事件

### **实践问题:**

#### 解决动态修改 loading 属性问题:

1. button 组件需要动态修改 loading 属性, 可以通过 class 内置一个修改属性的方法, 然后给组件绑定该方法

- 步骤:
  1. 创建一个 class 和一个 createClass 实例对象的方法, 接收传递的配置项数据, 通过 reactive 转为响应式对象. 然后进行 class 对象实例化, 返回成一个由 class 实例对象组成的新数组, 用于 ElButtonGrounp 组件渲染. 此时单个的 ElButtonGrounp 组件就渲染完成了.

  2. 表单中往往会渲染多个, 所以还需要解决以下问题

     1. class 的构造函数 createClass 方法, 不能接收同一个配置项, 否则 vue 会将它渲染成同一个组件, 导致 loading 属性被公用

        1. 解决方法: 创建 initButtonGrounpOptions 对象, 通过函数的方式深度克隆(_.cloneDeep)后, 传递给构造函数 createClass

           ```tsx
             function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
                 const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
                 return buttonGrounpOptions
             }
           ```


2. 怎么绑定事件问题: 将需要自定义的事件通过 async 包装成一个异步函数传递给 ElButtonGrounp 组件. 然后 ElButtonGrounp 等待异步组件的执行即可

   1. 由于 ElButtonGrounp 组件是通过 v-on 动态绑定事件的, 所以需要传递的是对象, 也就是 `{ click:()=>{...} }` 格式

      - 在注入事件时, 可以考虑将 loading 属性的变化封装在一起, 然后等待执行父组件传递来的事件, 在调用该事件时, 把配置对象传递过去. 这样就方便父组件精准的对该组件进行额外的配置

      - 注意: 我在 ElButtonGrounp 组件中, 执行父组件传递的事件时, 把当前组件的 class 实例化对象和接收的 row 都当作参数传递了. 所以父组件可以直接使用这些数据(类似与 vue 的父子组件通信---父组件传递方法给子组件, 子组件调用并传递数据, 这样父组件就可以访问子组件的数据了)

        ```tsx
        // 注入事件逻辑: 先 loading=true, 然后等待执行传递的方法, 然后 loading=false
        function createButtonEventHandler(classButtonOption: Options) {
            const { click: optionClick } = classButtonOption.events || {}
            return async () => {
                changePropsLoading(true)
                if (optionClick) {
                    await optionClick(classButtonOption, props.row)
                }
                changePropsLoading(false)
            }
            // 改变 loading 属性方法
            function changePropsLoading(value: boolean = false) {
                classButtonOption.setProps!('loading', value)
            }
        }
        
        props.options.forEach((classButtonOption) => {
            classButtonOption.events = {
                click: createButtonEventHandler(classButtonOption)
            }
        })
        
        
        // 父组件的配置项
        {
            id: 'search',
            innerHTML: '搜索全部数据',
            props: {
                icon: Search,
                type: 'info'
            },
            events: {
                click: (ctx, rows) => searchFn(ctx, rows)
            }
        }
        
        // 注意: 这里使用 async 包装成的异步组件
        async function searchFn(ctx: Partial<ClassButtonOptions>) {
            console.log("Edit")
            console.log(ctx)
            ctx.setInnerHTML!('查找中...')
            await 某一个异步函数()
            ctx.setInnerHTML!('查询成功')
        }
        ```
        

### ElButtonGrounp 实例化流程

1. 创建满足 `Partial<ClassButtonOptions>[]`  类型声明的配置项数组, 并通过函数的方式确保配置项唯一化

   1. 可以传递自定义事件

   ```tsx
   //  1. 创建 ElButtonGrounp 组件初始化配置项
   const initButtonGrounpOptions: Partial<ClassButtonOptions>[] = [
       {
           id: 'search',
           innerHTML: '搜索全部数据',
           props: {
               icon: Search,
               type: 'info'
           },
           // 传递自定义事件
           events: {
               click: (ctx, rows) => searchFn(ctx, rows)
           }
       }
   ]
   
   // 2. 创建深度克隆函数, 确保配置项唯一
   function getButtonGrounpOptions(initOptions: Partial<ClassButtonOptions>[]) {
       const buttonGrounpOptions = createButtonOptions(_.cloneDeep(initOptions))
       return buttonGrounpOptions
   }
   ```

   

2. 将该配置项通过 defineProps 的方式传递给 ElButtonGrounp 组件; 执行流程是:

   1. 先传递给递归调用渲染组件 RecursiveComponent, 这一步需要传递所有属性和 row 给 ElButtonGrounp 组件
   2. 然后渲染 ElButtonGrounp 组件, 这里接收到了所有属性和 row

   ```tsx
   // 1. 配置项传递给 RecursiveComponent 组件, 会透传给 ElButtonGrounp 组件
   {
       label: 'Action',
       prop: 'action',
       child: {
           type: ButtonGrounp,
           props: {
               options: () => getButtonGrounpOptions(initButtonGrounpOptions)
           }
       }
   }
   ```

   

## 封装的 Table 组件

### **思路:**

1. 使用配置项的方式生成模板, 用到 component 的 is 属性, 可以很方便的渲染 input select 等组件
2. 但是如果需要渲染嵌套组件, 例如 tooltip 包裹住的 button 组件, 就需要递归渲染, 所以选择把 component 封装成递归组件
3. 只参与模板渲染和数据透传, 逻辑交给组件去做

### **实现方式:**

1. 使用 v-for 循环配置项, 使用 component 渲染组件, 使用 v-bind 绑定属性, 通过判断配置项是否有 child 来确认是否需要使用递归调用组件. 使用 `#default={row}`, 解构出当前组件的数据 row, 在使用递归调用组件时, 传递 row

2. 如果需要递归调用, 则通过 props 传递 child row propName 等属性

3. 在递归调用组件中, 还是通过 v-bind 绑定属性, 还是通过判断是否有 child 来确认是否再次递归调用自己. 如果需要, 则还是传递 child row propName 等属性; 如果不需要, 则渲染 innerHTML 或 row[propName]

   1. 注意: 子组件可能嵌套多层, 为了性能考虑, 只传递给最终层完整的 row, 中间层使用函数的方式获取所需属性, 处理数据的方法放在渲染组件中更安全
   2. 中间层根据需要精准获取想要的数据, 不推荐把整个 row 传递过去

      ```tsx
      /**
       * 属性解析逻辑：
       * 1. 数组格式 [字段数组, 转换函数] - 用于需要从row提取特定字段并转换的场景
       *    示例: [['id', 'name'], ({id, name}) => `ID: ${id}, Name: ${name}`]
       *    
       * 2. 函数格式 () => any - 用于生成配置项等不需要row数据的场景
       *    示例: () => getButtonOptions(initOptions)
       *    
       * 3. 其他值 - 直接作为属性值传递
       */
      const resolvedProps = computed(() => {
          // 拿到传递的 props, 或置空
          const rawProps = props.child?.props || {}
          const finalProps: Record<string, any> = {}
      
          for (const key in rawProps) {
              const value = rawProps[key]
      
              // 如果传递的是数组并第 2 个是方法, 则传递所需要的值
              if (Array.isArray(value) && typeof value[1] === 'function') {
                  const [fieldPaths, fn] = value
                  const fieldValues: Record<string, any> = {}
                  for (const element of fieldPaths) {
                      fieldValues[element] = props.row?.[element]
                  }
                  finalProps[key] = fn(fieldValues)
              }
              // 需要把读取 row 和初始化配置项的方法分开, 降低耦合度
              else if (typeof value === 'function') {
                  finalProps[key] = value()
              }
              // 否则当作普通属性
              else {
                  finalProps[key] = value
              }
          }
          return finalProps
      })
      ```
   3. 典型的调用者配置项

      ```tsx
      {
          label: 'Id',
          prop: 'appId',
          child: {
              type: ElTooltip,
              props: {
                  effect: "dark",
                  placement: "top",
                  // 传递数组, 只能拿到所需要的属性, 此时 supplierName 是 undefined
                  content: [['appId', 'appName'], ({ appId, appName, supplierName }: Record<string, any>) => `应用ID是：${appId}, name 是: ${appName}, supplierName是:${supplierName}`],
              },
              child: {
                  type: ElButton,
              }
          }
      },
      {
          label: 'Action',
          prop: 'action',
          child: {
              type: ButtonGrounp,
              props: {
                  options: () => getButtonGrounpOptions(initButtonGrounpOptions)
              }
          }
      }
      ```

      


### 注意事项

1. 要牢记 vue3 的策略: vue3 会把所有没有被 defineProps 显式声明的属性收集到 $attrs

   1. 哪怕使用 v-on(@) 关键字注册为事件, 也会被收集到 $attrs, 不过会自动转为适合 createVNode 读取的配置项格式

   ```tsx
   // 1. 模板中传递事件
   <Table :table-column="tableColumn" :table-data="rows" :table-attribute="tableAttribute" @selection-change="handleSelectionChange" />
   
   // 2. 组件中读取
   import { useAttrs } from 'vue'
   const attrs = useAttrs()
   console.log('Table 组件接收到的 $attrs:', attrs)  ===> onSelectionChange:(val) => {…}
   ```

2.  所有事件绑定方法最终都会收敛为 VNode 的 props 中的 onXxx 事件格式

   1. 因为 vue 模板语法只是语法糖, vue 编译器会把所有事件相关指令统一转译成标准的 js 调用形式, 最终由 createVNode 创建虚拟节点时注册事件监听器, 所以下面的几个写法, 经过 vue 编译后都一样

      ```tsx
      // 1. 使用 @ 语法糖
      <MyButton @click="handleClick" />
      
      // 2. 使用 v-on
      <MyButton v-on:click="handleClick" />
      
      // 3. 使用 v-on 绑定多个事件; 这里只用一个示例
      <MyButton v-on="{ click: handleClick, ... }" />
      
      // 4. 使用 v-bind 明确绑定 onClick; 这里已经写出来最终格式, vue 无需转译就可以传给 createVNode
      <MyButton v-bind="{ onClick: handleClick }" />
      
      // 最终都会被转译为:
      createVNode(MyButton, {
        onClick: handleClick,
        onMouseenter: onEnter
      })
      ```

      

# 封装 Form 组件

1. 使用  `component is='h(ElButton,{...$attrs,ref:changRef},$slots)'`  的方式, 此时就需要考虑插槽了
2. 因为 Dialog 组件包裹的内容可能会更多
