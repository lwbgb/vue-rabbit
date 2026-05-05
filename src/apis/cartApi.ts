import type { CartItemDTO } from '@/types/cart';
import { axiosInstance } from '@/utils/http';

export function getCartList() {
    return axiosInstance({
        url: '/member/cart',
    });
}

export function insertItem(skuId: number, count: number) {
    return axiosInstance({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count,
        },
    });
}

export function deleteItemBySkuIds(skuIds: Array<number>) {
    return axiosInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: { ids: skuIds },
    });
}

export function mergeCart(CartItemDTOs: Array<CartItemDTO>) {
    return axiosInstance({
        url: '/member/cart/merge',
        method: 'POST',
        data: CartItemDTOs,
    });
}
