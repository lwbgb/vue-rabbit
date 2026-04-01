import { HomeBannerType } from '@/constants/component.const';
import { useHomeStore } from '@/stores/homeStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

export const useBanner = () => {
    const homeStore = useHomeStore();
    const { bannerList } = storeToRefs(homeStore);
    const { initHomeBanner } = homeStore;

    onMounted(() => {
        initHomeBanner(HomeBannerType.CATEGORY_PAGE);
    });

    return { bannerList };
};
