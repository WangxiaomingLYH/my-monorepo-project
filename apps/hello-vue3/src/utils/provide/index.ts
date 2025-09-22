import type { App } from 'vue';

export function setupGlobalProvides(app: App) {
    // 使用 app.provide 进行全局提供
    app.provide('message', 'hello from global');
    app.provide('message2', 'hello from global2');
}