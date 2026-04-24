export interface CheckoutInfo {
    goods: Array<CheckoutItem>;
    summary: Summary;
    userAddresses: Array<Address>;
}

export interface CheckoutItem {
    id: number;
    name: string;
    count: number;
    price: number;
    picture: string;
    skuId: number;
    attrsText: string;
    payPrice: number;
    totalPrice: number;
    totalPayPrice: number;
}

export interface Summary {
    discountPrice: number;
    goodsCount: number;
    postFee: number;
    totalPayPrice: number;
    totalPrice: number;
}

export interface Address {
    address: string;
    addressTags: string;
    cityCode: string;
    contact: string;
    countyCode: string;
    fullLocation: string;
    id: number;
    isDefault: number;
    postalCode: string;
    provinceCode: string;
    receiver: string;
}
