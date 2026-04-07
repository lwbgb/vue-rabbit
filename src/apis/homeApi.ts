import { axiosInstance } from '@/utils/http';

export function getHomeBanner(distributionSite: string) {
    return axiosInstance({
        url: 'home/banner',
        params: { distributionSite },
    });
}

export function getNewGoods() {
    return axiosInstance({
        url: 'home/new',
    });
}

export function getHotGoods() {
    return axiosInstance({
        url: 'home/hot',
    });
}

export function getProduct() {
    return axiosInstance({
        url: 'home/goods',
    });
}

export function getCategory() {
    return axiosInstance({
        url: '/home/category/head',
    });
}

