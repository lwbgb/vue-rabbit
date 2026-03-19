import { getHomeBanner } from '@/apis/homeApi';
import type { HomeBanner } from '@/types/home';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('home', () => {
    const bannerList = ref<Array<HomeBanner>>([]);
    const initHomeBanner = async () => {
        const res = await getHomeBanner();
        console.log({ res });
        bannerList.value = res.data.result;
    };

    return { bannerList, initHomeBanner };
});
