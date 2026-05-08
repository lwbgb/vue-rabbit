import { getOrderInfo } from '@/apis/orderApi';
import type { Order } from '@/types/order';
import { useCountdown } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useOrderStore = defineStore('order', () => {
    const orderInfo = ref<Order>();
    const countdown = computed(() => orderInfo.value?.countdown ?? 0);
    const { remaining, start, stop, pause, resume } = useCountdown(countdown, {
        onComplete() {},
        onTick() {},
    });

    watch(
        countdown,
        newValue => newValue > 0 ? start() : stop(),
        { once: true },
    );

    async function updateOrderInfo(id: string) {
        const res = await getOrderInfo(id);
        console.log(`getOrderInfo, res: `, res);
        orderInfo.value = res.data.result;
    }

    return { orderInfo, remaining, updateOrderInfo };
});
