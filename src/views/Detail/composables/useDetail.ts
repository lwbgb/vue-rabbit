import { getDetail } from "@/apis/detailApi";
import type { GoodDetail } from "@/types/goods";
import { ref, watchEffect } from "vue";

export const useDetail = (props: {id: string}) => {
    const goodsDetails = ref<GoodDetail>();

    async function getGoodDetail(id: string) {
        const res = await getDetail(id);
        console.log(`getGoodDetail res:`, res);
        goodsDetails.value = res.data.result;
    }

    // 路由缓存问题
    watchEffect(async () => {
        await getGoodDetail(props.id);
    });

    return { goodsDetails };
};;
