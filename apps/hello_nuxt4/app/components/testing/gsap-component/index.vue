<script setup lang="ts">
// 参考地址：https://gsap.framer.wiki/stated

import gsap from 'gsap';

const runGsap = () => {
    gsap.to('.box', {
        // 常用属性
        duration: 3,  // 动画变化的时长（秒）默认是0.5
        delay: 0.2,  // 动画变化开始前的延迟时长（秒），默认是0.5；使用 repeatDelay 设置每次重复动画前的延迟秒数
        repeat: 0,  // 动画的重复次数，如果设置了 yoyo 为 true，则这里最少为1；设置为 -1 则会无限重复
        yoyo: true,  // 如果设置为ture，那么动画会在执行完之后再反向执行一次，就像悠悠球的效果，默认是false
        stagger: 0.2,  // 是一个时间的设置（秒），如果有多个元素同时要被驱动，那么当这个属性设置了时间的值之后，元素们会被依次逐个驱动，间隔时长就是这个属性设置的时长
        ease: 'bounce.out',  // 动画过渡的运动曲线的设置，默认是"power1.out"
        onComplete: () => { },  // 动画结束时执行的回调函数
        // 基本属性
        rotation: 360,
        x: 10,
        yPercent: 50,
        backgroundColor: '#8d3dae',
    })

    // 使用时间线依次执行动画效果
    // 把多个tween动画效果添加到时间线上，默认他们就会按照他们添加的顺序依次执行
    let time1 = gsap.timeline()
    time1.to(".svgBox1", { x: 70, duration: 2 });
    time1.to(".svgBox2", { x: 70, duration: 1 });
    time1.to(".svgBox3", { x: 70, duration: 1 });

    // 使用位置参数 Position Parameter，精准控制事件线
    /**
     * <：前一个动画执行时执行
     * >：前一个动画执行后执行
     * +=1：当前时间线的动画全部执行完成，再过 1s 执行
     * -=1：当前时间线的动画全部执行完成的前 1s 执行，必须放在 +=1 前面
     */
    let time2 = gsap.timeline()
    time2.to(".svgBoxTwo1", { x: 70, duration: 2 }, 1);
    time2.to(".box2", { x: 70, duration: 1 }, '<');
    time2.to(".box3", { x: 70, duration: 2 }, 1);
    time2.to(".box4", { x: 70, duration: 3 }, 1);
    time2.to(".box5", { x: 70, duration: 4 }, 1);
    time2.to(".box6", { x: 70, duration: 1 }, '-=1');
    time2.to(".box7", { x: 70, duration: 1 }, '+=1');

    // 使用实例后，能对动画添加更详细的控制
    let tween = gsap.to(".box2", { duration: 1, x: 100 });
    // 暂停
    tween.pause();

    // 恢复（继续）
    tween.resume();

    // 反向变化
    tween.reverse();

    // 直接切换到整个动画变化时长的0.5秒的时间点的状态
    tween.seek(0.5);

    // 直接切换到整个变化过程的1/4的节点的状态
    tween.progress(0.25);

    // 让运动减速到0.5倍
    tween.timeScale(0.5);

    // 让变化加速到原来的2倍
    tween.timeScale(2);

    // 直接销毁tween实例，让垃圾回收机制可以处理该实例所占用的内存
    tween.kill();


    /**
     * 动画事件，在 tween 和 timelines 里都有这些事件
     * onComplete：动画结束时触发
     * onStart：动画开始时触发
     * onUpdate：只要动画运行，每一帧都会触发（元素有属性变化时）
     * onRepeat：每次动画重复时触发
     * onReverseComplete：当动画反向执行后运动到变化起始点时触发
     */


    // 关键帧 KeyFrames
    let time3 = gsap.timeline();
    time3.to(".box8", {
        x: 100
    })
        .to(".box8", {
            y: 100
        })
        .to(".box8", {
            x: 0
        })
        .to(".box8", {
            y: 0
        });
    // 可以简写为
    time3.to(".box9", {
        keyframes: {
            x: [0, 100, 100, 0, 0],
            y: [0, 0, 100, 100, 0],
            ease: "power1.inOut"
        },
        duration: 2
    });
    // 也可以使用数组的写法，更精细的定制动画
    time3.to(".box10", {
        keyframes: [ // 注意这里是数组
            { x: 100, duration: 1, ease: 'sine.out' }, // 定义这个分段动画自己的ease曲线
            { y: 200, duration: 1, delay: 0.5 }, // 产生和前个分段动画0.5秒的间隔
            { rotation: 360, duration: 2, delay: -0.25 } // 和前一个分段动画产生0.25秒的重叠
        ],
        ease: 'expo.inOut' // 设置整个关键帧动画的曲线
    });
    // v3.9+ 版本支持使用百分比的方式
    time3.to(".box11", {
        keyframes: {  // 注意这里是对象
            "0%": { x: 0, y: 0 },
            "75%": { x: 100, y: 100, ease: 'sine.out' }, // 指定这个分段的动画曲线
            "100%": { x: 50, y: 50 },
            easeEach: 'expo.inOut' // 每个分段的动画曲线
        },
        ease: 'none', // 整个关键帧动画的动画曲线
        duration: 2,
    });

    // 一个球体弹跳效果
    gsap.set(".svg-box", { opacity: 1 });
    gsap.to(".ball", {
        keyframes: {
            "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
            "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
            "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
            "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
            "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
            "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
            "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
            easeEach: "sine.out"
        },
        duration: 1,
        repeat: -1,
        transformOrigin: "center bottom"
    });

    gsap.to(".shadow", {
        scale: 0.7,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center"
    })

    gsap.to(".h2", {
        keyframes: {
            "0%": { yPercent: 0, scaleX: 1, scaleY: 1 },
            "7%": { yPercent: 5, scaleY: 0.9, scaleX: 1.1, ease: "sine.in" },
            "25%": { yPercent: 100, scaleY: 1.15, scaleX: 0.9, ease: "sine.in" },
            "50%": { yPercent: 500, scaleX: 1, scaleY: 1, ease: "none" },
            "60%": { scaleX: 1.6, scaleY: 0.4, ease: "none" },
            "65%": { yPercent: 500, scaleX: 1, scaleY: 1 },
            "100%": { yPercent: 0, scaleX: 1, scaleY: 1 },
            easeEach: "sine.out"
        },
        duration: 1,
        repeat: -1,
        transformOrigin: "center bottom"
    })
}
</script>

<template>
    <div>
        <v-row align="stretch">
            <v-col cols="12">
                <!-- <gsap-com-demo3></gsap-com-demo3> -->
            </v-col>
            <v-col>
                <!-- <gsap-com-demo2></gsap-com-demo2> -->
            </v-col>
            <v-col>
                <!-- <gsap-com-demo1></gsap-com-demo1> -->
            </v-col>
            <v-col cols="12">
                <v-btn @click="runGsap">执行动画</v-btn>
            </v-col>
            <v-col>
                <div class="box w-10 h-10" />
                <div class="box w-10 h-10" />
            </v-col>
            <v-col>
                <svg id="svg" class="w-20 h-20" viewBox="0 0 100 100">
                    <rect class="svgBox svgBox1" fill="#28a92b" x="0" y="0" width="30" height="30" rx="2" />
                    <rect class="svgBox svgBox2" fill="#28a92b" x="0" y="35" width="30" height="30" rx="2" />
                    <rect class="svgBox svgBox3" fill="#28a92b" x="0" y="70" width="30" height="30" rx="2" />
                </svg>
            </v-col>
            <v-col>
                <svg id="svg" class="w-20 h-20" viewBox="0 0 100 100">
                    <rect class="svgBoxTwo svgBoxTwo1" fill="#28a92b" x="0" y="0" width="30" height="30" rx="2" />
                    <rect class="svgBoxTwo svgBoxTwo2" fill="#28a92b" x="0" y="35" width="30" height="30" rx="2" />
                    <rect class="svgBoxTwo svgBoxTwo3" fill="#28a92b" x="0" y="70" width="30" height="30" rx="2" />
                </svg>
            </v-col>
            <v-col>
                <div class="box2 bg-black w-10 h-10 mb-1"></div>
                <div class="box3 bg-black w-10 h-10 mb-1"></div>
                <div class="box4 bg-black w-10 h-10 mb-1"></div>
                <div class="box5 bg-black w-10 h-10 mb-1"></div>
                <div class="box6 bg-black w-10 h-10 mb-1"></div>
                <div class="box7 bg-black w-10 h-10 mb-1"></div>
            </v-col>
            <v-col>
                <div class="box8 bg-black w-10 h-10 mb-1"></div>
            </v-col>
            <v-col>
                <div class="box9 bg-black w-10 h-10 mb-1"></div>
            </v-col>
            <v-col>
                <div class="box10 bg-black w-10 h-10 mb-1"></div>
            </v-col>
            <v-col>
                <div class="box11 bg-black w-10 h-10 mb-1"></div>
            </v-col>
            <v-col>
                <svg class="svg-box" viewBox="0 0 100 200">
                    <defs>
                        <linearGradient id="grad-1" x1="30" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2" stop-color="#0ae448" />
                            <stop offset="0.5" stop-color="#abff84" />
                        </linearGradient>
                    </defs>
                    <ellipse class="shadow opacity-2" cx="50" cy="188" rx="15" ry="5" />

                    <circle fill="url(#grad-1)" class="ball" cx="50" cy="22" r="15" />
                </svg>
            </v-col>
            <v-col>
                <h2 class="h2">使用文本</h2>
            </v-col>
            <v-col cols="12">
                <!-- <gsap-com-3D-card></gsap-com-3D-card> -->
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss">
.box {
    background-color: #000;
}
</style>