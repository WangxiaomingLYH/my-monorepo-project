import type { DirectiveBinding } from 'vue';

interface CopyElement extends HTMLElement {
    $copyHandler?: (event: MouseEvent) => void;
    $copyValue?: string;
    $copyCallback?: (value: string) => void;
}


export default {
    beforeMount(el: CopyElement, binding: DirectiveBinding<string | ((value: string) => void)>) {
        if (binding.arg === 'callback') {
            el.$copyCallback = binding.value as (value: string) => void;
        } else {
            const handler = () => {
                copyTextToClipboard(el, el.$copyValue ?? '');
                if (el.$copyCallback) {
                    el.$copyCallback(el.$copyValue ?? '');
                }
            };
            el.addEventListener('click', handler);
            el.$copyHandler = handler;
        }
    },

    updated(el: CopyElement, binding: DirectiveBinding<string | ((value: string) => void)>) {
        // 更新复制的值, 用于获取异步更新的数据
        if (binding.arg !== 'callback') {
            el.$copyValue = binding.value as string;
        } else {
            el.$copyCallback = binding.value as (value: string) => void;
        }
    },

    beforeUnmount(el: CopyElement) {
        // 清理事件监听
        if (el.$copyHandler) {
            el.removeEventListener('click', el.$copyHandler);
        }
        delete el.$copyHandler;
        delete el.$copyValue;
        delete el.$copyCallback;
    }
};

interface CopyContainerElement extends HTMLElement { }

interface CopyTextToClipboardResult {
    succeeded: boolean;
}

function copyTextToClipboard(
    containerEl: CopyContainerElement,
    text: string
): CopyTextToClipboardResult {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.contain = 'strict';
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.style.fontSize = '12pt';

    containerEl.appendChild(textarea);
    textarea.select();
    textarea.selectionStart = 0;
    textarea.selectionEnd = text.length;

    let succeeded = false;
    try {
        succeeded = document.execCommand('copy');
    } catch { }

    textarea.remove();
    return { succeeded };
}
