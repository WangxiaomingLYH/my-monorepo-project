/**
 * 根据 URLSearchParams 构造函数, 将对象转为查询字符串
 *  主要就记住三个实例方法 .append() .set() .toString()
 *      - .append(name, value): 将指定的键/值对附加为新的查询参数; 同一个键被多次附加，则它将为每个值多次出现在参数字符串中
 *      - .set(): 将指定的键/值对附加为新的查询参数; 此方法会删除重复的查询参数；如果查询参数不存在，则创建它
 *      - .toString(): 回适用于 URL 中的查询字符串
 * 
 * 值得注意的是 value 如果是数组或者是对象, 需要对自身方法的递归, 这里并没有展示, 因为若查询参数是三级对象, 建议使用 qs 库 pnpm add qs, 但 nuxt 项目则不需要, 因为 $fetch 和 useFetch 封装了该功能
 * @param params 
 * @returns 
 */

export function utilsObjectToQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (Array.isArray(value)) {
            value.forEach(item => {
                searchParams.append(key, item.toString());
            });
        } else if (typeof value === 'object') {
            // 简单对象处理，复杂对象建议用 qs
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                if (nestedValue !== null && nestedValue !== undefined) {
                    searchParams.append(`${key}[${nestedKey}]`, nestedValue.toString());
                }
            });
        } else {
            searchParams.append(key, value.toString());
        }
    });

    return searchParams.toString();
}

// 使用示例
const queryParams = utilsObjectToQueryString({
    page: 1,
    pageSize: 20,
    name: 'John Doe',
    filters: ['electronics', 'books'],
    sort: { field: 'price', order: 'desc' }
});

const url = `/api/data?${queryParams}`;