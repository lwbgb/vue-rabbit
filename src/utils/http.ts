import axios from 'axios';
import { AxiosConfig } from '@/constants/http.const';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

// 配置 Axios 实例
export const axiosInstance = axios.create({
    baseURL: AxiosConfig.BASE_URL,
    timeout: AxiosConfig.TIME_OUT,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
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
        ElMessage.warning(error.response.data.msg);
        return Promise.reject(error);
    },
);
