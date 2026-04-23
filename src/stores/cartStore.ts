import type { CartItem } from '@/types/cart';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './userStore';
import { deleteItemBySkuIds, getCartList, insertItem, mergeCart } from '@/apis/cartApi';
import { ElMessage } from 'element-plus';

export const useCartStore = defineStore('cart', () => {
    const cartList = ref<Array<CartItem>>([]);

    const userStore = useUserStore();

    const totalCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0));

    const allSelected = computed(() => cartList.value.every(item => item.selected));

    const selectedCount = computed(() =>
        cartList.value.reduce((sum, item) => (item.selected ? sum + item.count : sum), 0),
    );

    const totalPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.price * item.count, 0));

    const selectedPrice = computed(() =>
        cartList.value.reduce((sum, item) => (item.selected ? sum + item.price * item.count : sum), 0),
    );

    async function initCartList() {
        if (userStore.isLogin) {
            await updateCartList();
        } else {
            ElMessage.warning('请先登录账号！');
        }
    }

    async function addItem(cartItem: CartItem) {
        if (userStore.isLogin) {
            await insertItem(cartItem.skuId, cartItem.count);
            await updateCartList();
        } else {
            const item = cartList.value.find(item => item.skuId === cartItem.skuId);
            if (item) {
                item.count++;
            } else {
                cartList.value.push(cartItem);
            }
        }
    }

    async function deleteItemBySkuId(skuId: number) {
        if (userStore.isLogin) {
            await deleteItemBySkuIds([skuId]);
            await updateCartList();
        } else {
            const index = cartList.value.findIndex(item => item.skuId == skuId);
            cartList.value.splice(index, 1);
        }
    }

    async function updateCartList() {
        const res = await getCartList();
        console.log(`getCartList, res:`, res);
        cartList.value = res.data.result;
    }

    async function mergeCartList() {
        await mergeCart(
            cartList.value.map(item => ({
                skuId: item.skuId,
                selected: item.selected,
                count: item.count,
            })),
        );
        await updateCartList();
    }

    function clearCartList() {
        cartList.value = [];
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
        initCartList,
        addItem,
        deleteItemBySkuId,
        updateCartList,
        mergeCartList,
        clearCartList,
        setSelected,
        selectAllItem,
        excludeAllItem,
    };
});
