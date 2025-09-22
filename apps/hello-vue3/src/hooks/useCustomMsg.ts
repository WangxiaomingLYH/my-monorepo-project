import { customRef } from "vue";

export default function (initValue: string, delay: number) {
    // 设置一个默认展示内容

    let timer: number

    // 设置并配置自定义ref函数
    let msg = customRef((track, trigger) => {
        return {
            // get()：当使用msg时触发
            get() {
                // track()：让vue对msg进行持续关注
                track()

                // 当使用msg时，把这个默认值返回出去
                return initValue
            },
            // set()：当修改msg时触发
            set(value) {

                // 清除上一个定时器，只执行最新生成的定时器
                clearTimeout(timer)


                // 直接使用setTimeout会有抖动，因为快速输入多个数据后，会生成很多个定时器
                // setTimeout会返回该定时器的id
                timer = setTimeout(() => {
                    // 当msg被修改时，把新值传给 默认值（initValue）
                    initValue = value
                    // trigger()：通知vue数据msg发生了变化
                    trigger()
                    console.log("生成了一个定时器");

                    // 延迟多久由用户传入的参数决定
                }, delay)

            }
        }
    })
    // 向外return
    return msg
}