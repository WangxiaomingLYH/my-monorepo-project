export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const delay = Number(query.delay || 1000);
    const name = query.name || 'unknown';

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, delay));

    return {
        message: `Hello ${name}`,
        timestamp: Date.now()
    };
})