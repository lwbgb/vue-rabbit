import { axiosInstance } from '@/utils/http';

export function getDetail(id: string) {
    return axiosInstance({
        url: '/goods',
        params: { id },
    });
}

/**
 * 获取热榜商品
 * @param {string} id - 商品id
 * @param {number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {number} limit - 获取个数
 */
export const getHotList = (id: string, type: number, limit: number = 3) => {
    return axiosInstance({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit,
        },
    });
};
