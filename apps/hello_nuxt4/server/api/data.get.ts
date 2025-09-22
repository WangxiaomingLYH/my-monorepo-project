/**
 * 
1. 请求参数
delay: 延迟时间（毫秒），默认1000ms

page: 当前页码，默认1

pageSize: 每页显示条数，默认20

name: 自定义名称，默认'unknown'


2. 返回的页码信息:

page: 当前页码

pageSize: 每页显示数量

totalItems: 总数据条数（5000）

totalPages: 总页数

hasNext: 是否有下一页

hasPrev: 是否有上一页

nextPage: 下一页页码（如果没有则为null）

prevPage: 上一页页码（如果没有则为null）
 */


export interface QueryParams {
    delay?: number;
    page?: number;
    pageSize?: number;
    name?: string;
}
type Category = 'Electronics' | 'Clothing' | 'Books' | 'Food'
export interface ProductItem {
    id: number;
    name: string;
    description: string;
    price: string; // 保留字符串格式，因为用了 toFixed(2)
    createdAt: string;
    category: Category;
    inStock: boolean;
    rating: number;
}
export interface PaginationInfo {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
}
export interface DataResponse {
    items: ProductItem[];
    pagination: PaginationInfo;
}
export interface ApiResponse {
    success: boolean;
    message: string;
    timestamp: number;
    data: DataResponse;
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
    const query = getQuery(event) as QueryParams;
    const delay = Number(query.delay || 1000);
    const page = Number(query.page || 1);
    const pageSize = Number(query.pageSize || 20);
    const name = query.name || 'unknown';

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 生成模拟数据（5000条）
    const totalItems = 5000;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    // 生成当前页的数据
    const data = Array.from({ length: endIndex - startIndex }, (_, index) => {
        const id = startIndex + index + 1;
        return {
            id,
            name: `Item ${id}`,
            description: `This is description for item ${id}`,
            price: (Math.random() * 1000).toFixed(2),
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            category: ['Electronics', 'Clothing', 'Books', 'Food'][Math.floor(Math.random() * 4)] as Category,
            inStock: Math.random() > 0.3,
            rating: Math.floor(Math.random() * 5) + 1
        };
    });

    // 分页信息
    const pagination: PaginationInfo = {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
    };

    // 数据响应
    const dataResponse: DataResponse = {
        items: data,
        pagination
    };

    // 返回分页响应
    const response: ApiResponse = {
        success: true,
        message: `Hello ${name}`,
        timestamp: Date.now(),
        data: dataResponse
    };

    return response;
});