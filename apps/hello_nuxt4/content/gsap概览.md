---
title: gsap 动画效果概览
---

# 基础
1. tween 动画由三个部分组成: method target vars
![tween的三个组成部分](https://gsap.com/assets/images/tween-diagram-39f72740ce8fddcca921341f8a4bd007.png)
2. **method**
    - gsap.to(): 元素动画从当前值 to 到定义的值
    - gsap.from(): 元素动画从指定的值 from 到当前值
    - gsap.fromTo(): 元素动画从当前值闪烁到第一个指定值, 然后在 to 到第二个指定值
    - gsap.set():
3. **target**
    - 可以是 ref 的dom元素, 也可以是元素选择器(类名 id 子类等)
4. **vars**
    - 包含有关动画的所有信息
5. **vars 配置项**
    > 常用动画效果属性
    - duration: 3,  // 动画变化的时长（秒）默认是0.5
    - delay: 0.2,  // 动画变化开始前的延迟时长（秒），默认是0.5；使用 repeatDelay 设置每次重复动画前的延迟秒数
    - repeat: 0,  // 动画的重复次数，如果设置了 yoyo 为 true，则这里最少为1；设置为 -1 则会无限重复
    - yoyo: true,  // 如果设置为ture，那么动画会在执行完之后再反向执行一次，就像悠悠球的效果，默认是false
    - stagger: 0.2,  // 是一个时间的设置（秒），如果有多个元素同时要被驱动，那么当这个属性设置了时间的值之后，元素们会被依次逐个驱动，间隔时长就是这个属性设置的时长
    - ease: 'bounce.out',  // 动画过渡的运动曲线的设置，默认是"power1.out"
    - onComplete: () => { },  // 动画结束时执行的回调函数
    > 基本属性
    - rotation: 360,
    - x: 10,
    - yPercent: 50,
    - backgroundColor: '#8d3dae',
    > 位移变换 (Translation)
    >> GSAP 的 x/y默认单位是 px，而 xPercent/yPercent是百分比
    
    | GSAP 属性      | CSS 等价写法                   | 含义                                        |
    | :------------- | :----------------------------- | :------------------------------------------ |
    | `x: 100`       | `transform: translateX(100px)` | 沿 **X 轴** 水平移动 100 像素（正值向右）。 |
    | `y: 100`       | `transform: translateY(100px)` | 沿 **Y 轴** 垂直移动 100 像素（正值向下）。 |
    | `xPercent: 50` | `transform: translateX(50%)`   | 基于元素自身宽度的 **50%** 水平移动。       |
    | `yPercent: 50` | `transform: translateY(50%)`   | 基于元素自身高度的 **50%** 垂直移动。       |

    >缩放变换 (Scale)
    >>`scale(1)`是原始大小，`scale(0.5)`会缩小到一半。

    | GSAP 属性   | CSS 等价写法           | 含义                                     |
    | :---------- | :--------------------- | :--------------------------------------- |
    | `scale: 2`  | `transform: scale(2)`  | 元素 **整体放大 2 倍**（宽高同时缩放）。 |
    | `scaleX: 2` | `transform: scaleX(2)` | 仅 **水平方向（宽度）** 放大 2 倍。      |
    | `scaleY: 2` | `transform: scaleY(2)` | 仅 **垂直方向（高度）** 放大 2 倍。      |
    
    >旋转变换 (Rotation)

    | GSAP 属性             | CSS 等价写法               | 含义                                            |
    | :-------------------- | :------------------------- | :---------------------------------------------- |
    | `rotation: 90`        | `transform: rotate(90deg)` | 元素 **顺时针旋转 90 度**（单位默认是 `deg`）。 |
    | `rotation: "1.25rad"` | 无直接 CSS 简写            | 使用 **弧度制**（1 rad ≈ 57.3°），需手动计算。  |
    
    >斜切变换 (Skew)

    | GSAP 属性          | CSS 等价写法              | 含义                                           |
    | :----------------- | :------------------------ | :--------------------------------------------- |
    | `skew: 30`         | `transform: skew(30deg)`  | 元素 **X 和 Y 轴同时斜切 30 度**（菱形效果）。 |
    | `skewX: 30`        | `transform: skewX(30deg)` | 仅 **水平方向** 斜切（类似平行四边形）。       |
    | `skewY: "1.23rad"` | 无直接 CSS 简写           | 使用弧度制斜切 **垂直方向**。                  |
    
    >变换原点 (Transform Origin)
    >>**常见值**：`"left top"`、`"50% 100%"`、`"center"`

    | GSAP 属性                       | CSS 等价写法                   | 含义                                                     |
    | :------------------------------ | :----------------------------- | :------------------------------------------------------- |
    | `transformOrigin: "center 40%"` | `transform-origin: center 40%` | 设置变换的 **基准点**（这里是水平居中，垂直 40% 位置）。 |

    >透明度 & 可见性
    >>**区别**：`autoAlpha`是 GSAP 的语法糖，结合了 `opacity`和 `visibility`。

    | GSAP 属性      | CSS 等价写法                     | 含义                                          |
    | :------------- | :------------------------------- | :-------------------------------------------- |
    | `opacity: 0`   | `opacity: 0`                     | 元素完全透明（但仍占据空间，可交互）。        |
    | `autoAlpha: 0` | `opacity: 0; visibility: hidden` | 透明 + **隐藏元素**（不占据空间，不可交互）。 |

    >动画控制属性

    | GSAP 属性     | CSS 等价写法                          | 含义                              |
    | :------------ | :------------------------------------ | :-------------------------------- |
    | `duration: 1` | `animation-duration: 1s`              | 动画持续 **1 秒**。               |
    | `repeat: -1`  | `animation-iteration-count: infinite` | 动画 **无限循环**。               |
    | `repeat: 2`   | `animation-iteration-count: 2`        | 动画重复 **2 次**。               |
    | `delay: 2`    | `animation-delay: 2s`                 | 动画 **延迟 2 秒** 开始。         |
    | `yoyo: true`  | `animation-direction: alternate`      | 动画 **往返播放**（如弹跳效果）。 |

1. 控制方法
    ```ts
    // 将补间动画或时间线存储在变量中
    let tween = gsap.to("#logo", {duration: 1, x: 100});

    // 开始动画
    tween.play()
        - 注意:
         1. 动画被创建出来后就会执行, 若需手动确认执行时间, 则开启不要自动执行属性 `paused: true`
         2. 动画在创建时, dom 可能未挂载完成, 所以遇到动画失效时, 可以 log 定义的动画, 查看 target 属性是否为空
         3. 建议将创建动画函数放在 dom 挂载完毕后的声明周期里

    // 暂停动画
    tween.pause();

    // 恢复播放（会尊重之前的方向 - 无论是否反向）
    tween.resume();

    // 反向播放（总是向动画起点方向播放）
    tween.reverse();

    // 跳转到动画的0.5秒处
    tween.seek(0.5);

    // 跳转到动画进度的1/4处（0.25表示25%进度）
    tween.progress(0.25);

    // 让动画以半速播放
    tween.timeScale(0.5);

    // 让动画以双倍速播放
    tween.timeScale(2);

    // 立即终止动画并使其可被垃圾回收
    tween.kill();

    // 你甚至可以链式调用控制方法
    // 以双倍速反向播放时间线
    tween.timeScale(2).reverse();
    ```