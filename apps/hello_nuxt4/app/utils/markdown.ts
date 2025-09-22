// 获取内容方法
export const getContent = async (catalogue: 'content' | 'readme', path: string) => {
    const { data } = await useAsyncData(`${catalogue}-${path}`, () => {
        return queryCollection(catalogue).path(path).first()
    })
    // getContent 返回的数据可能嵌套很深（尤其是从数据库或者 CMS 拉取的对象），可能存在循环引用或者过深的层级. 直接赋值给 editContent.value 后，如果你在组件里渲染或操作，会有性能问题甚至可能无限递归。 我们可以对 getContent 返回的数据做 安全浅拷贝 + 循环引用防护
    return utilsSafeClone(data.value)
}