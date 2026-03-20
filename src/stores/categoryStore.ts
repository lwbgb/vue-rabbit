import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCategory } from '@/apis/layoutApi';
import type { HeaderCategory } from '@/types/category';

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref<Array<HeaderCategory>>([]);
    const initCategory = async () => {
        const res = await getCategory();
        console.log(`getCategory res:`, res);
        categoryList.value = res.data.result;
    };

    return { categoryList, initCategory };
});
