import { getCategoryInfoById } from '@/apis/categoryApi';
import type { CategoryInfo } from '@/types/category';
import { onMounted, ref, watchEffect } from 'vue';

export const useCategory = (props: { id: string }) => {
    const categoryInfo = ref<CategoryInfo>();
    // const route = useRoute();

    const getCategoryInfo = async (id: string = props.id) => {
        // const res = await getCategoryInfoById(+(route.params.id ?? 0));
        const res = await getCategoryInfoById(id);
        console.log(`getCategoryInfo:`, res);
        categoryInfo.value = res.data.result;
    };

    // 路由缓存时，相同的组件实例会被复用，组件的生命周期钩子不会被重复调用。有以下 3 中方法解决：
    // 1. 为路由添加唯一的 key，强制组件重新渲染
    // 2. 使用 watch 监听路由参数的变化，手动调用数据获取
    // 3. 使用 onBeforeRouteUpdate 钩子，在路由更新时获取数据

    watchEffect(async () => {
        await getCategoryInfo(props.id);
    });

    // onBeforeRouteUpdate(async (to) => {
    //   await getCategoryInfo(to.params.id as string);
    // });
    // onMounted(() => {
    //     getCategoryInfo();
    // });

    return { categoryInfo };
};
