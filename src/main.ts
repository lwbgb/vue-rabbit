import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';

// 引入初始化样式文件
import '@/styles/common.scss';
import { useIntersectionObserver } from '@vueuse/core';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');

// 自定义全局指令
app.directive('img-lazy', (img, binding) => {
    const stop = useIntersectionObserver(
        img,
        ([entry]) => {
            if (entry?.isIntersecting) {
                img.src = binding.value;
            }
        },
        { rootMargin: '50px' },
    );
});
