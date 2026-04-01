import { getHomeBanner } from '@/apis/homeApi';
import type { HomeBanner } from '@/types/home';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('home', () => {
    const bannerList = ref<Array<HomeBanner>>([]);
    const initHomeBanner = async (distributionSite: string = '1') => {
        const res = await getHomeBanner(distributionSite);
        console.log(`getHomeBanner res:`, res);
        bannerList.value = res.data.result;
    };

    return { bannerList, initHomeBanner };
});
