import { login } from '@/apis/userApi';
import router from '@/router';
import type { LoginInfo } from '@/types/login';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useCartStore } from './cartStore';

export const useUserStore = defineStore('user', () => {
    // const loginInfo = ref<LoginInfo>();
    // 1. 使用 vueUse 将用户登录信息持久化到本地
    const loginInfo = useStorage<LoginInfo>('user', null, localStorage, {
        serializer: StorageSerializers.object,
    });

    const isLogin = computed(() => loginInfo.value?.token);

    const cartStore = useCartStore();

    async function doLogin(account: string, password: string) {
        const res = await login(account, password);
        console.log('login, res:', res);
        loginInfo.value = res.data.result;
    }

    function logout() {
        loginInfo.value = null;
        cartStore.clearCartList();
        router.push('/login');
    }

    return { loginInfo, isLogin, doLogin, logout };
});
