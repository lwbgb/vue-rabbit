import type { OrderDTO } from '@/types/order';
import { axiosInstance } from '@/utils/http';

export function getCheckoutInfo() {
    return axiosInstance({
        url: '/member/order/pre',
    });
}

export function createOrder(oderDTO: OrderDTO) {
    return axiosInstance({
        url: '/member/order',
        method: 'POST',
        data: oderDTO,
    });
};
