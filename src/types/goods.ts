import type { Product } from './product';
import type { Brand } from './brand';

export interface Goods {
    id: number;
    name: string;
    price: number;
    orderNum: number;
    desc: string;
    picture: string;
    title: string;
    alt?: string;
}

interface property {
    name: string;
    value: string;
}

export interface Sku {
    id?: number;
    skuId?: number;
    skuCode: string;
    price: number;
    picture: string;
    oldPrice: number;
    inventory: number;
    specsText?: string;
}

export interface Spec {
    id: number;
    name: string;
    values: Array<{
        name: string;
        picture: string;
        desc: string;
        selected: boolean;
    }>;
}

export interface GoodDetail extends Goods {
    brand: Brand;
    categories: Array<Product>;
    collectCount: number;
    commentCount: number;
    details: {
        pictures: Array<string>;
        properties: Array<property>;
    };
    discount: number;
    evaluationInfo: string;
    hotByDay: Array<Goods>;
    inventory: number;
    isCollect: string;
    isPreSale: boolean;
    mainPictures: Array<string>;
    mainVideos: Array<string>;
    oldPrice: number;
    recommends: string;
    salesCount: number;
    similarProducts: Array<Goods>;
    skus: Array<Sku>;
    specs: Array<Spec>;
    spuCode: string;
    userAddresses: string;
    videoScale: number;
}
