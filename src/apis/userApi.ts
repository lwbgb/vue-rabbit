import { axiosInstance } from '@/utils/http';

export function login(account: string, password: string) {
    return axiosInstance({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password,
        },
    });
}

export function getLikeList(limit: number) {
    return axiosInstance({
        url: '/goods/relevant',
        params: { limit },
    });
}
