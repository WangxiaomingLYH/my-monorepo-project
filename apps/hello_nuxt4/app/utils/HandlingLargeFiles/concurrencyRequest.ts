/**
 * 并发请求方法
 */

// 定义请求配置接口
export interface RequestConfig {
    url: string;
    options?: RequestInit;
    meta?: any; // 可选：用于携带额外信息，如 index
}
// 定义请求结果接口
export interface RequestResult<T> {
    status: 'fulfilled' | 'rejected';
    data?: T;
    error?: string;
    retries: number;
    meta?: any;
}

export const utilsConcurrencyRequest = async <T>(urls: RequestConfig[], maxConcurrent: number = 3, maxRetries: number = 0): Promise<RequestResult<T>[]> => {
    // 参数验证
    if (!Array.isArray(urls)) {
        throw new TypeError('urls参数必须是数组');
    }

    if (urls.length === 0) {
        return [];
    }

    if (maxConcurrent <= 0) {
        throw new RangeError('maxConcurrent必须大于0');
    }
    const results: RequestResult<T>[] = [];
    let targetIndex = 0;

    // 封装 fetch 请求, 添加重试功能
    const attemptRequest = async (config: RequestConfig, retriesLeft: number): Promise<RequestResult<T>> => {
        const { url = '', options, meta } = config;
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { status: 'fulfilled', data, retries: maxRetries - retriesLeft, meta };
        } catch (error) {
            if (retriesLeft > 0) {
                console.warn(`⚠️ 请求失败，重试中... (${maxRetries - retriesLeft + 1}/${maxRetries})`, meta);
                // 显式return 递归的响应结果
                return await attemptRequest(config, retriesLeft - 1);
            } else {
                return {
                    status: 'rejected',
                    error: error instanceof Error ? error.message : String(error),
                    retries: maxRetries,
                    meta,
                };
            }
        }
    };

    // 工作者函数
    const workers = Array(Math.min(maxConcurrent, urls.length))
        .fill(null)
        .map(async () => {
            while (targetIndex < urls.length) {
                const currentIndex = targetIndex++;
                const config = urls[currentIndex];
                const result = await attemptRequest(config!, maxRetries);
                results[currentIndex] = result;
            }
        });

    // 等待所有工作完成
    await Promise.all(workers);
    return results;
}