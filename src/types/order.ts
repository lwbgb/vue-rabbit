import type { CheckoutItem } from './checkout';
import type { Sku } from './goods';

export interface OrderDTO {
    addressId: number;
    buyerMessage: string;
    deliveryTimeType: number;
    goods: Array<CheckoutItem>;
    payChannel: number;
    payType: number;
}

export interface OrderPageDTO {
    orderState: number;
    page: number;
    pageSize: number;
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
    skus: Array<OrderItemSku>;
    totalMoney: number;
    totalNum: number;
    arrivalEstimatedTime: string;
    cityCode: string;
    closeTime: string;
    consignTime: null;
    countyCode: string;
    deliveryTimeType: number;
    endTime: string;
    evaluationTime: string;
    payState: number;
    payTime: string;
    provinceCode: string;
    receiverAddress: string;
    receiverContact: string;
    receiverMobile: string;
}

interface property {
    propertyMainName: string;
    propertyValueName: string;
}

interface OrderItemSku {
    id: number;
    name: string;
    quantity: number;
    curPrice: number;
    image: string;
    spuId: number;
    attrsText: string;
    realPay: number;
    totalMoney: number;
    properties: Array<property>;
}

export interface UserOrder {
    count: number;
    page: number;
    pageSize: number;
    pages: number;
    items: Array<Order>;
}
