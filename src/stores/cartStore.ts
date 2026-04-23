import type { CartItem } from '@/types/cart';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartList = ref<Array<CartItem>>([]);

    const totalCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0));

    const allSelected = computed(() => cartList.value.every(item => item.selected));

    const selectedCount = computed(() =>
        cartList.value.reduce((sum, item) => (item.selected ? sum + item.count : sum), 0),
    );

    const totalPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.price * item.count, 0));

    const selectedPrice = computed(() =>
        cartList.value.reduce((sum, item) => (item.selected ? sum + item.price * item.count : sum), 0),
    );

    function addItem(cartItem: CartItem) {
        const item = cartList.value.find(item => item.skuId === cartItem.skuId);
        if (item) {
            item.count++;
        } else {
            cartList.value.push(cartItem);
        }
    }

    function deleteItemBySkuId(skuId: number) {
        const index = cartList.value.findIndex(item => item.skuId == skuId);
        cartList.value.splice(index, 1);
    }

    function setSelected(cartItem: CartItem, selected: boolean) {
        cartItem.selected = selected;
    }

    function selectAllItem() {
        cartList.value.forEach(item => (item.selected = true));
    }

    function excludeAllItem() {
        cartList.value.forEach(item => (item.selected = false));
    }

    return {
        cartList,
        totalCount,
        allSelected,
        selectedCount,
        totalPrice,
        selectedPrice,
        addItem,
        deleteItemBySkuId,
        setSelected,
        selectAllItem,
        excludeAllItem,
    };
});
