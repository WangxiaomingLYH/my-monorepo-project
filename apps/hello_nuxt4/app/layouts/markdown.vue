<template>
    <v-app>

        <v-main class="bg-zinc-50">
            <markdown-header></markdown-header>
            <v-container>
                <div class="markdown-layout min-h-screen">
                    <main class="markdown-container bg-white flex-1 shadow-sm p-8">
                        <slot />
                    </main>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<style lang="scss">
.markdown-layout {
    .markdown-container {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            position: relative;
            /* 为锚点符号定位 */
            font-weight: 600;
            line-height: 1.4;
            margin-top: 2rem;
            margin-bottom: 1rem;
            scroll-margin-top: 80px;
        }

        /* 使用 ::before 或 ::after 添加 # */
        h3::before,
        h4::before,
        h5::before,
        h6::before {
            position: absolute;
            left: -1.5rem;
            /* 根据需求调整位置 */
            color: #6b7280;
            font-size: 0.75rem;
            /* 小号字体 */
            font-weight: 300;
            opacity: 0;
            /* 默认隐藏 */
            transition: opacity 0.2s ease;
        }

        h3::before {
            content: "H3";
        }

        h4::before {
            content: "H4";
        }

        h5::before {
            content: "H5";
        }

        h6::before {
            content: "H6";
        }

        /* 鼠标悬停显示 */
        h3:hover::before,
        h4:hover::before,
        h5:hover::before,
        h6:hover::before {
            opacity: 1;
        }


        h1 {
            font-size: 2.25rem; // 大号标题
            font-weight: 700; // 加粗
            line-height: 1.3;
            border-bottom: 2px solid #e5e7eb; // 底部细线
            padding-bottom: 0.5rem;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: #111827;
        }

        /* 二级标题 H2 */
        h2 {
            font-size: 1.75rem; // 比 H1 小一些
            font-weight: 600;
            line-height: 1.4;
            border-left: 4px solid #3b82f6; // 左侧蓝色标识
            padding-left: 0.75rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            color: #1f2937;
        }

        h3 {
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.5;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            color: #374151;
        }

        h4 {
            font-size: 1.125rem;
            font-weight: 500;
            line-height: 1.5;
            margin-top: 1.75rem;
            margin-bottom: 0.5rem;
            color: #4b5563;
        }

        h5 {
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.4;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
        }

        h6 {
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.3;
            margin-top: 1.25rem;
            margin-bottom: 0.25rem;
            color: #6b7280;
            font-style: italic;
        }

        p {
            margin: 1rem 0;
            line-height: 1.75;
            color: #4b5563;
        }

        ul,
        ol {
            margin: 1rem 0 1rem 1.25rem;
            list-style: disc;
        }

        code {
            background: #f3f4f6;
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }

        pre {
            background: #f5f7fa; // 浅灰背景
            color: #2c3e50; // 深灰文字
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-size: 0.875rem;
            line-height: 1.5;
            margin: 1.5rem 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
        }

        thead tr {
            border-bottom: 1px solid #d1d5db;
            /* 表头底部线 */
        }

        tbody tr {
            border-bottom: 1px solid #d1d5db;
            /* 每行底部线 */
        }

        td,
        th {
            padding: 0.5rem 0.75rem;
            text-align: left;
            color: #374151;
        }

        blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: #4b5563;
            font-style: italic;
            background: #f9fafb;
        }
    }
}
</style>