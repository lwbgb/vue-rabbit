export interface CartItem {
    id: number;
    name: string;
    picture: string;
    price: number;
    skuId: number;
    count: number;
    attrsText: string;
    selected: boolean;
}

export interface CartItemDTO {
    skuId: number;
    count: number;
    selected: boolean;
}
