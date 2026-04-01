import { createRouter, createWebHistory } from 'vue-router';
import layout from '@/views/Layout/index.vue';
import login from '@/views/Login/index.vue';
import home from '@/views/Home/index.vue';
import category from '@/views/Category/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 一级路由
        {
            path: '/',
            component: layout,
            // 二级路由
            children: [
                { path: '', component: home },
                // 开启 props 将参数转化为 props 传递
                { path: 'category/:id', component: category, props: true},
            ],
        },
        { path: '/login', component: login },
    ],
});

export default router;
