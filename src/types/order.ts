import type { CheckoutItem } from "./checkout";
import type { Sku } from "./goods";

export interface OrderDTO {
    addressId: number;
    buyerMessage: string;
    deliveryTimeType: number;
    goods: Array<CheckoutItem>;
    payChannel: number;
    payType: number;
}

export interface Order {
    id: string;
    countdown: number;
    createTime: string;
    orderState: number;
    payChannel: number;
    payLatestTime: string;
    payMoney: number;
    payType: number;
    postFee: number;
    skus: Array<Sku>;
    totalMoney: number;
    totalNum: number;
}
