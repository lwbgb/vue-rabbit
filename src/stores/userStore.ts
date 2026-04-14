import { login } from '@/apis/userApi';
import type { LoginInfo } from '@/types/login';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    // const loginInfo = ref<LoginInfo>();

    // 1. 使用 vueUse 将用户登录信息持久化到本地
    const loginInfo = useStorage<LoginInfo>('user', null, localStorage, {
        serializer: StorageSerializers.object,
    });

    async function getLoginInfo(account: string, password: string) {
        const res = await login(account, password);
        console.log('login, res:', res);
        loginInfo.value = res.data.result;
    }

    function removeUserInfo() {
        loginInfo.value = null;
    }

    return { loginInfo, getLoginInfo, removeUserInfo };
});
