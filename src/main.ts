import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';

// 引入初始化样式文件
import '@/styles/common.scss';
import { lazyPlugin } from './directives';
import { componentPlugin } from './components';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount('#app');
