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

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryInfo = (data: {
    categoryId: number;
    page: number;
    pageSize: number;
    sortField: 'publishTime' | 'orderNum' | 'evaluateNum';
}) => {
    return axiosInstance({
        url: '/category/goods/temporary',
        method: 'POST',
        data,
    });
};
