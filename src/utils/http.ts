import axios from 'axios';
import { AxiosConfig } from '@/constants/http.const';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import router from '@/router';

// 配置 Axios 实例
export const axiosInstance = axios.create({
    baseURL: AxiosConfig.BASE_URL,
    timeout: AxiosConfig.TIME_OUT,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 每次发送请求前携带 token
        const userStore = useUserStore();
        const { loginInfo } = storeToRefs(userStore);
        if (loginInfo && loginInfo.value?.token) {
            config.headers.Authorization = `Bearer ${loginInfo.value.token}`;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        ElMessage.warning(error.response?.data.message);
        const userStore = useUserStore();
        if (error.response?.status === 401) {
            userStore.removeUserInfo();
            router.push('/login');
        }
        return Promise.reject(error);
    },
);
