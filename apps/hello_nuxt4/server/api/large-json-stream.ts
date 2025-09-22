export default defineEventHandler(async (event) => {
    // 获取查询参数，例如 ?total=1000&interval=1
    const query = getQuery(event);
    const total = Number(query.total || 1000);     // 要生成的条数
    const interval = Number(query.interval || 1);  // 每条间隔（ms）

    // 设置响应头
    setResponseHeaders(event, {
        'Content-Type': 'application/json; charset=utf-8',
        'Transfer-Encoding': 'chunked',
    });

    // 获取原生的 Node.js 响应对象
    const res = event.node.res;

    // 每条数据写一行 JSON
    for (let i = 1; i <= total; i++) {
        const item = {
            id: i,
            name: `User ${i}`,
            timestamp: Date.now(),
        };

        res.write(JSON.stringify(item) + '\n');

        // 模拟流式输出延迟
        await new Promise((r) => setTimeout(r, interval));
    }

    res.end();
});
