import { axiosInstance } from '@/utils/http';

export function getCategoryInfoById(id: string) {
    return axiosInstance({
        url: '/category',
        params: { id },
    });
}

export function getCategoryFilterById(id: string) {
    return axiosInstance({
        url: '/category/sub/filter',
        params: { id },
    });
}
