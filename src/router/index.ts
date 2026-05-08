import { createRouter, createWebHistory } from 'vue-router';
import layout from '@/views/Layout/index.vue';
import login from '@/views/Login/index.vue';
import home from '@/views/Home/index.vue';
import category from '@/views/Category/index.vue';
import subCategory from '@/views/SubCategory/index.vue';
import detail from '@/views/Detail/index.vue';
import cart from '@/views/Cart/index.vue';
import checkout from '@/views/Checkout/index.vue';
import pay from '@/views/Pay/index.vue';
import payBack from '@/views/Pay/PayBack.vue';

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
                { path: 'category/:id', component: category, props: true },
                { path: 'category/sub/:id', component: subCategory, props: true },
                { path: 'detail/:id', component: detail, props: true },
                { path: 'cartList', component: cart },
                { path: 'checkout', component: checkout },
                { path: 'pay', component: pay},
                { path: 'paycallback', component: payBack},
            ],
        },
        { path: '/login', component: login },
    ],
    // 设置切换路由时，页面滚动的位置
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'smooth' };
    },
});

export default router;
