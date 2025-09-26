import { ElMessage } from "element-plus";

interface CustomCopyHTMLElement extends HTMLElement {
  _copyHandler?: (event: Event) => void;
  _copyValue?: string;
  _mutationObserver?: MutationObserver;
}

const vCopy = {
  mounted(el: CustomCopyHTMLElement, binding: { value: string }) {
    // 存储初始值
    el._copyValue = binding.value;

    const handler = async (event: Event) => {
      event.preventDefault();

      // 优先使用存储的值，否则使用当前文本内容
      const text = el._copyValue || el.textContent?.trim() || '';
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        console.log('复制成功:', text);

        if (typeof ElMessage !== 'undefined') {
          ElMessage.success(`已复制: ${text}`);
        }
      } catch (err) {
        console.error('复制失败:', err);
        if (typeof ElMessage !== 'undefined') {
          ElMessage.error('复制失败');
        }
      }
    };

    el.style.cursor = 'pointer';
    el._copyHandler = handler;
    el.addEventListener('click', handler);

    // 使用 MutationObserver 监听文本内容变化
    el._mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          // 文本内容发生变化，更新存储的值
          el._copyValue = el.textContent?.trim() || '';
          console.log('检测到文本变化，更新值为:', el._copyValue);
          break;
        }
      }
    });

    // 监听子节点和文本内容的变化
    el._mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true
    });
  },

  updated(el: CustomCopyHTMLElement, binding: { value: string }) {
    // 更新存储的值
    if (el._copyValue !== binding.value) {
      el._copyValue = binding.value;
      console.log('指令值更新为:', binding.value);
    }
  },

  beforeUnmount(el: CustomCopyHTMLElement) {
    if (el._copyHandler) {
      el.removeEventListener('click', el._copyHandler);
      delete el._copyHandler;
    }

    if (el._mutationObserver) {
      el._mutationObserver.disconnect();
      delete el._mutationObserver;
    }

    delete el._copyValue;
  }
};

export default vCopy;