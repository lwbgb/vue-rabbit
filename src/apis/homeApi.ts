import { axiosInstance } from "@/utils/http";

export function getHomeBanner() {
    return axiosInstance({
        url: 'home/banner',
    });
}
