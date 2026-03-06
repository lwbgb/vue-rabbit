import type { Result } from '@/types/result';
import { axiosInstance } from '@/utils/http.ts';

function getCategory() {
    return axiosInstance({
        url: 'home/category/head',
    });
}

export { getCategory };
