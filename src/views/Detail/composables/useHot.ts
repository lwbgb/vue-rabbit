import { getHotList } from '@/apis/detailApi';
import type { Goods } from '@/types/goods';
import { onMounted, ref } from 'vue';

export const useHot = (props: { id: string }) => {
    enum HotType {
        Day = 1,
        Week = 2,
    }
    const hotDayList = ref<Array<Goods>>();
    const hotWeekList = ref<Array<Goods>>();

    async function initHotList(limit?: number) {
        const map = new Map();
        map.set(HotType.Day, hotDayList);
        map.set(HotType.Week, hotWeekList);
        for (const [type, list] of map) {
            const res = await getHotList(props.id, type, limit);
            console.log(`getHotList type ${type} res:`, res);
            list.value = res.data.result;
        }
    }

    onMounted(() => {
        initHotList(8);
    });

    return { hotDayList, hotWeekList };
};
