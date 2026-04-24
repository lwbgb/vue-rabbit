import { axiosInstance } from '@/utils/http';

export function getCheckoutInfo() {
    return axiosInstance({
        url: '/member/order/pre',
    });
}
