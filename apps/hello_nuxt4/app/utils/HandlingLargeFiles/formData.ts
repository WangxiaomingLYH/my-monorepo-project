// 包装成 FormData 对象

interface FileChunk {
    index: number;
    chunk: Blob;
    size: number;
    start: number;
    end: number;
}
export function utilsWrapChunksToFormData(chunkList: FileChunk[], fileName: string): { index: number; formData: FormData }[] {
    if (!Array.isArray(chunkList)) {
        throw new TypeError("wrapChunksToFormData: chunkList 必须是一个数组.");
    }

    if (chunkList.length === 0) {
        throw new Error("wrapChunksToFormData: chunkList 不能为空.");
    }

    if (typeof fileName !== "string" || fileName.trim() === "") {
        throw new TypeError("wrapChunksToFormData: fileName 必须是个非空字符串.");
    }
    const total = chunkList.length;
    return chunkList.map((chunk, index) => {
        if (
            typeof chunk.index !== "number" ||
            !(chunk.chunk instanceof Blob) ||
            typeof chunk.size !== "number" ||
            typeof chunk.start !== "number" ||
            typeof chunk.end !== "number"
        ) {
            console.warn(
                `wrapChunksToFormData:索引处的块无效: ${index}`,
                chunk
            );
            throw new Error(`索引处的块结构无效 ${index}`);
        }

        if (chunk.index < 0 || chunk.index >= total) {
            throw new RangeError(
                `wrapChunksToFormData:块索引无效： ${chunk.index}`
            );
        }

        if (chunk.size <= 0 || chunk.start < 0 || chunk.end <= chunk.start) {
            throw new Error(
                `wrapChunksToFormData:索引处的块大小或范围无效 ${chunk.index}`
            );
        }
        const formData = new FormData();
        formData.append("file", chunk.chunk, `${fileName}.part${chunk.index}`);
        formData.append("index", chunk.index.toString());
        formData.append("length", total.toString());  // 这里为了避免引起歧义, 将 total 更名为 length
        formData.append("size", chunk.size.toString());
        formData.append("start", chunk.start.toString());
        formData.append("end", chunk.end.toString());
        formData.append("fileName", fileName);
        return {
            index: chunk.index,
            formData,
        };
    });
}