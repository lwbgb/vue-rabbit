import { login } from '@/apis/userApi';
import type { LoginInfo } from '@/types/login';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const loginInfo = ref<LoginInfo>();

    async function getLoginInfo(account: string, password: string) {
        const res = await login(account, password);
        console.log('login, res:', res);
        loginInfo.value = res.data.result;
    }

    return { loginInfo, getLoginInfo };
});
