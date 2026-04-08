import { axiosInstance } from '@/utils/http';

export function getDetail(id: string) {
    return axiosInstance({
        url: '/goods',
        params: { id },
    });
}
