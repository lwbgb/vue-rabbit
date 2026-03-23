import { useIntersectionObserver } from '@vueuse/core';
import type { App } from 'vue';

// 自定义全局指令
export const lazyPlugin = {
    install: (app: App) => {
        app.directive('img-lazy', (img, binding) => {
            const { stop } = useIntersectionObserver(
                img,
                ([entry]) => {
                    if (entry?.isIntersecting) {
                        img.src = binding.value;
                        stop();
                    }
                },
                { rootMargin: '50px' },
            );
        });
    },
};
