/**
 * 切割大文件为多个小块
 * @param file 原始文件
 * @param chunkSize 单个块大小（默认 5MB）
 * @returns 切片结果对象
 */

export interface FileChunk {
    index: number;
    chunk: Blob;
    size: number;
    start: number;
    end: number;
}

export interface FileSliceResult {
    fileName: string;
    fileSize: number;
    fileType: string;
    chunkTotal: number;
    chunkList: FileChunk[];
}
export function utilsSliceFile(file: File, maxSize: number = 5): FileSliceResult {
    if (maxSize <= 0) throw console.error("分片大小不能小于0");

    // 传入的文件总大小
    const fileSize = file.size;
    // 每个分片文件的大小
    const fileSliceSize = maxSize * 1024 * 1024;
    // 需要切分的块数, 向上取整
    const chunkTotal = Math.ceil(fileSize / fileSliceSize);
    // 存储每一个切片信息的数组
    const chunkList: FileChunk[] = [];
    // 目标切片文件在数组中的索引

    for (let index = 0; index < chunkTotal; index++) {
        const start = index * fileSliceSize;
        // 边界保护, 当剩余文件大小不足 fileSliceSize 时
        const end = Math.min(fileSliceSize * (index + 1), fileSize);
        const chunk = file.slice(start, end);
        chunkList.push({
            index,  // 循环从 0 开始, 计数从 1 开始, 所以这里要 +1
            chunk,
            size: end - start,
            start,
            end,
        });
    }
    return {
        fileName: file.name,
        fileSize,
        fileType: file.type,
        chunkTotal,
        chunkList,
    };
}