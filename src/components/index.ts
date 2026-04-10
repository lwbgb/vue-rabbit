import type { App } from 'vue';
import ImageView from '@/components/ImageView/index.vue';
import XtxSku from '@/components/XtxSku/index.vue';

export const componentPlugin = {
    install: (app: App) => {
        app.component('ImageView', ImageView);
        app.component('XtxSku', XtxSku);
    },
};
