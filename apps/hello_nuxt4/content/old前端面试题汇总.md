## `vue`项目中怎么优化性能，提高加载速度

```
1. 代码拆分和懒加载
  使用vue的异步组件
  使用动态 import语法来实现路由组件的懒加载

2. 图片优化
  使用懒加载技术，仅在需要的时候加载图片
  使用 vue-lazyload

3. 缓存
  配置HTTP缓存头，确保静态资源可以被浏览器缓存
  使用 Service Worker实现离线缓存
  
4. 其他
  减少DOM操作
  使用虚拟滚动技术，如vue-virtual-scroll-list优化长列表渲染

<template>
<RecycleScroller
:items="bigList"
:item-size="54"
key-field="id"
page-mode
>
<template #default="{ item }">
<ListItem :item="item" />
</template>
</RecycleScroller>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
</script>

```

## 什么是策略模式, 都有哪些应用场景

### 怎么排序一个对象, 使用 map 集合
    1. map 的 key 是有序的, 使用这个特性可以解决对象转 json 时的顺序问题

## git rebase 干啥 合并多次提交

## git fetch git pull

## typescript

### 重载 类型收窄

## 大文件上传, 多并发操作

## From 校验功能

## 虚拟滚动的缺点

#### 简答题

###### 延迟加载有哪些方式

```
在js标签上添加async（js解析完后就执行）或defer（dom解析完成后，执行js）
```



###### 数据类型

```
基本数据类型：string number 布尔值 null undefined 符号 bigInint
引用数据类型：数组，对象，map，正则，Date，function
```



###### null和undefined

```
undefined是解决null转化为0
undefined转为NaN
```



###### 事件循环

```
同步任务 进入事件循环 清空微任务 执行宏任务
```



###### 作用域及作用域链

```
当前作用域声明 > 传递的参数 > 悬挂声明 > 外部作用域声明 > 全局声明
```



###### 数组

```
.push()
.pop()
.unshift()
.shift()
.splice(star,deleteCount,item)

.slice(star,end)
.indexOf() 索引值或-1
.map()
.filter() 返回索引值
.findeIndex()
.contcat() // 合并数组
.reduce  // 数组所有值相加
.sort() // 数组排序
.reverse() 反转
.length(0)  // 清空数组
```



###### 闭包

```
一个函数对周围状态的引用捆绑在一起，形成了闭包
可以实现数据私有化
常见的闭包有手写的防抖、节流函数，或者封装一些公共方法，
```



###### js自定义方法

```
使用原型对象设置公共方法
Array.prototype.xxxFn = function(){}
```



###### 原型链

```
就是被一个个 __proto__ 链接起来的prototype，最终指向Object.prototype
```



###### js继承

```
通过class类实现继承

class Parent {
  constructor() {
    this.age = 18
  }
}


// extends继承类
class Child extends Parent {

  constructor() {
    // super()函数调用父类
    super()
    this.name = '张三'
  }
}
```

###### 解决回调地狱

```
在.then()方法中 return一个新的Promise对象 就能链式调用了
或者使用 async await
```

###### 防抖与节流

```
用定时器做 节流必须要有if判断 在定时器内部把定时器的唯一id设置为空
```



###### this指向及改变this

```
this指向根据它的调用者
.call()
.apple()
.bind()
```



###### cookie和token的区别

```
Cookie是一种存储在用户浏览器中的小型文本文件，用于保存用户的会话信息和偏好设置。服务器通过HTTP头部将Cookie发送给客户端，客户端会在后续请求中将Cookie发送回服务器。
	通常每个Cookie大小限制为4KB
Token是一种身份验证的凭证，通常由服务器生成并发放给客户端，客户端在后续请求中使用Token进行身份验证。Token通常是一个加密字符串，包含用户信息和签名。
	没有严格限制，但通常比Cookie大
	
Cookie：主要用于会话管理和个性化设置，存储在浏览器中，通过HTTP头部传递，适用于简单的会话管理和跨页面的状态保持。
Token：主要用于API认证和安全通信，通常存储在LocalStorage或SessionStorage中，通过HTTP头部或请求参数传递，适用于前后端分离的应用和移动应用。
```



###### 定时器为什么不靠谱

```
超过五次嵌套有4ms的延迟
浏览器的优化策略，非活动标签会不执行，可以让该标签后台请求web音频API：AudioContext
调用定时器的函数指向完成后，才会调用定时器
```

###### 数组去重

```
简单方式：利用new Set()的唯一性
如果不想保留null undefined NaN，则可以用 filter做个过滤
```



###### 找出多维度数组中最大值

```
小数组用： array.flat(Infinity)  加上Math.max()
中数组用：递归结合for of 判断循环的元素是否是数组 然后三元表达式
超大数组用：定义一个模拟栈，用迭代循环避免栈超出


flat()：方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中
```



###### 0.1+0.2===0.3 false

```
console.log(0.1 + 0.2 === 0.3);  ===> false
因为两数相加会先转变为二进制 0.1和0.2转换成二进制时尾数会无限循环，造成精度丢失
```



###### 如何判断js数据类型

```
1. typerof  返回结果有：number、string、boolean、object、undefined、function；缺点是无法判断null和具体是什么对象
2. console.log( [] instanceof Array); 通过判断对象上是否有某个原型，来来判断对象的具体类型
3. 终极方案：通过Object.prototype.toString.call(要检查的数据)  ===> 返回[Object,xxx]  xxx就是检查的数据类型，配合正则表达式

function extractType(variable) {
    // 获取对象的类型字符串，例如 "[object String]"
    let typeString = Object.prototype.toString.call(variable);

    // 使用正则表达式提取 "String" 部分
    let regex = /\[object (\w+)\]/;
    let match = typeString.match(regex);

    if (match) {
        return match[1]; // 返回匹配的类型部分，即 "String"
    } else {
        return "Unknown"; // 如果没有匹配到，返回 "Unknown"
    }
}

// 示例用法
console.log(extractType('1')); // 输出: String
```



###### 事件和事件流

```
事件流：一般是 捕获阶段和冒泡阶段
常见事件是：DOM事件，如点击、经过、滚动、窗口大小发生变化、input事件、加载完成事件等
```



###### new一个函数发生了什么

```
1. 在内存开辟一个空间
2. this指向该空间
3. 执行构造语句，也就是对象的初始化
4. return实例对象
```



#### 操作题

###### 数组去重

```
使用new Set(array)方法
	优点：简洁明了，性能好

const array = [1,2,3,3,2,1,undefined,undefined,NaN,NaN,null,null]

// 会保留undefined，null，NaN
function uniqueArray(arr){
	return [...new Set(arr)]
}

// 做个判断，不保留undefined，null，NaN
function uniqueArray(arr){
	return [...new Set(arr.filter(item => item!=null && item!=undefined && !Number.isNaN(item)))]
}

const array2 = uniqueArray2(array)
console.log(array2);


-----------------------------------------------------------------------------------------------

知识点：Set 是 ES6引入的一种新的数据结构，用于存储唯一值。与数组不同，Set 结构不会存储重复的值。
let mySet = new Set();

// 添加一些元素
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(1); // 重复的值不会被添加

console.log(mySet); // 输出: Set { 1, 2, 3 }
add(value)：向 Set 中添加一个新元素。
delete(value)：删除 Set 中的指定元素。
has(value)：检查 Set 中是否存在指定元素。
clear()：清空 Set 中的所有元素。
size：返回 Set 中的元素个数。

Number.isNaN(item)  ===> 返回布尔值
```

###### 找出多维数组最大值

```javascript
1. 小数组；高性能；需兼容flat方法
使用使用 flat(Infinity) 和 Math.max
优点：性能好，代码简洁
缺点：大数组会占用很多内存；需要支持ES2019 flat方法（基本上都支持）

function findMax(arr) {
    // 将多维数组拉平为一维数组
    const flatArray = arr.flat(Infinity);
    // 使用 Math.max 找到最大值
    return Math.max(...flatArray);
}

2. 大数组；低性能；兼容性强
// 递归方法
function findMaxRecursive(arr) {
    let max = -Infinity;

    function recursiveFind(array) {
        for (let value of array) {
            if (Array.isArray(value)) {
                recursiveFind(value);
            } else {
                max = value > max ? value : max;
            }
        }
    }
    recursiveFind(arr);
    return max;
}

// 迭代方法
function findMaxIterative(arr) {
    let max = -Infinity;
    // 使用stack模拟栈，每次调用递归函数时，都会弹出一个数组，能够有效的避免栈超出
    const stack = [arr];

    while (stack.length) {
        // 弹出一个数组，赋值给current；
        // 然后遍历数组里的值，如果该值是数组，则写入到stack模拟栈中,stack.length增加，继续循环
        // 这些内容是为了让函数栈转变成模拟栈
        const current = stack.pop();

        for (let value of current) {
            if (Array.isArray(value)) {
                stack.push(value);
            } else {
                max = value > max ? value : max;
            }
        }
    }
    return max;
}


function findMax(arr) {
    // 定义一个阈值，超过这个阈值则使用迭代方法
    const THRESHOLD = 1000; // 可以根据实际情况调整阈值

    // 检查数组的深度
    function getDepth(arr) {
        let maxDepth = 1;
        arr.forEach(item => {
            if (Array.isArray(item)) {
                const depth = getDepth(item);
                if (depth + 1 > maxDepth) {
                    maxDepth = depth + 1;
                }
            }
        });
        return maxDepth;
    }

    // 得到数组深度
    const depth = getDepth(arr);

    // 如果数组深度大于设定的阈值
    if (depth > THRESHOLD) {
        // 使用迭代方法
        return findMaxIterative(arr);
    } else {
        // 使用递归方法
        return findMaxRecursive(arr);
    }
}


---------------------------------------------------------------------------------------

知识点：array.flat()
解决栈超出的问题：把函数栈转变成显示栈（数据结构栈），也就是迭代方法
    函数调用栈 vs 数据结构栈
    函数调用栈:
        每次函数调用都会在函数调用栈上创建一个新的调用帧。
        如果递归调用过多，调用栈的深度会增加，最终可能导致栈溢出（Stack Overflow）。
    数据结构栈:
        是我们在代码中显式使用的栈结构（如数组模拟的栈）。
        这个栈只是普通的内存数据结构，不会影响函数调用栈的深度。
        
迭代方法 是通过重复执行一段代码（通常是通过循环结构，如 for、while 等）来解决问题的方法。迭代方法通常不涉及函数的自我调用，而是通过显式的控制结构来管理算法的执行过程。
使用循环：迭代方法通常使用 for 循环、while 循环等来重复执行代码块。
显式控制：通过显式的控制结构（如栈、队列等）来管理数据和流程。
避免递归：迭代方法不需要函数的自我调用，从而避免了递归调用可能导致的栈溢出问题
```

###### 找出字符串中出现最多次数的字符及次数

###### 

## vue 的三个核心模块