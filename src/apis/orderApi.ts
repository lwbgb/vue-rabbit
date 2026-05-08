import { axiosInstance } from '@/utils/http';

export function getOrderInfo(id: string) {
    return axiosInstance({
        url: `/member/order/${id}`,
    });
}
