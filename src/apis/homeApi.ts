import { axiosInstance } from '@/utils/http';

export function getHomeBanner() {
    return axiosInstance({
        url: 'home/banner',
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
