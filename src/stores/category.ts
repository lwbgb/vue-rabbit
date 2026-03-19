import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCategory } from '@/apis/layout';
import type { HeaderCategory } from '@/types/HeaderCategory';

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref<Array<HeaderCategory>>([]);
    const initCategory = async () => {
        const res = await getCategory();
        console.log(res);
        categoryList.value = res.data.result;
    };

    return { categoryList, initCategory };
});
