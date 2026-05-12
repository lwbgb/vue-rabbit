import type { OrderPageDTO } from '@/types/order';
import { axiosInstance } from '@/utils/http';

export function getOrderInfo(id: string) {
    return axiosInstance({
        url: `/member/order/${id}`,
    });
}

export function getUserOrder(orderPageDTO: OrderPageDTO | undefined) {
    return axiosInstance({
        url: '/member/order',
        method: 'GET',
        params: orderPageDTO,
    });
}
