// Node.js 的 异步文件操作方法
import { writeFile, mkdir } from 'fs/promises'
// Node.js 的 join 方法，用于拼接路径
import { join } from 'path'
import { ref } from 'vue'


// 生成唯一 ID —— 这里用精确到秒的时间戳, 返回格式为: 20250822_174953
const getUniqueId = () => {
    const now = new Date()
    const uniqueId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
        now.getDate()
    ).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(
        now.getMinutes()
    ).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`
    return uniqueId
}
let uniqueId = undefined

export default defineEventHandler(async (event) => {
    // 读取请求体，期望内容为 { filename: string, content: string }
    // readBody 是 Nuxt 提供的工具函数，用于解析请求体（JSON / 表单等）
    const body = await readBody<{ fileName?: string, content: string }>(event)

    // 参数校验：如果缺少 filename 或 content，则抛出错误
    // createError 是 Nuxt 提供的工具函数，用于生成 HTTP 错误响应
    if (!body?.content) {
        throw createError({ statusCode: 400, statusMessage: '缺少参数' })
    }
    const uniqueId = body.fileName ? body.fileName.replace(/\.md$/, '') : getUniqueId()
    console.log(uniqueId, "@uniqueId")
    // 获取项目根目录下的 content 文件夹路径
    // process.cwd() 返回 Node.js 进程的当前工作目录
    const contentDir = join(process.cwd(), 'content')

    // 拼接完整的文件路径
    const filePath = join(contentDir, `${uniqueId}.md`)

    // 确保目录存在：
    // mkdir 的 recursive: true 表示如果父目录不存在会自动递归创建
    await mkdir(contentDir, { recursive: true })

    // 将 content 写入文件：
    // writeFile(路径, 内容, 编码)
    // 这里用 'utf-8' 保证写入的是文本文件
    await writeFile(filePath, body.content, 'utf-8')

    // 返回执行结果
    return { success: true, path: filePath, fileName: `${uniqueId}.md` }
})
