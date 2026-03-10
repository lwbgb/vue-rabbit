import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueDevTools from 'vite-plugin-vue-devtools';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            // 自动导入 Element Plus 组件，并使用 sass 样式
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        }),
        // 使用 unplugin-element-plus 插件，并启用按需加载和默认语言设置
        ElementPlus({
            useSource: true,
            defaultLocale: 'zh-tw',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@test': fileURLToPath(new URL('./tests', import.meta.url)),
        },
    },
    // 全局引入 Element Plus 的样式
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                // 全局引入 Element Plus 的样式，供所有组件使用
                @use "@/styles/element/index.scss" as *;
                // 全局引入变量文件，供所有组件使用
                @use "@/styles/var.scss" as *;
                `,
            },
        },
    },
});
