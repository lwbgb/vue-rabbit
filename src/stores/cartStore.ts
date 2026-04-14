import type { CartItem } from '@/types/cart';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartList = ref<Array<CartItem>>([]);

    function addItem(cartItem: CartItem) {
        const item = cartList.value.find(item => item.skuId === cartItem.skuId);
        if (item) {
            item.count++;
        } else {
            cartList.value.push(cartItem);
        }
    }

    return { cartList, addItem };
});
