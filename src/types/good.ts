import type { Product } from './product';
import type { Brand } from './brand';

export interface Good {
    id: number;
    name: string;
    price: string;
    orderNum: number;
    desc: string;
    picture: string;
    title: string;
    alt: string;
}

interface property {
    name: string;
    value: string;
}

export interface Sku {
    id: number;
    skuCode: string;
    price: string;
    oldPrice: string;
    inventory: number;
}

interface Spec {
    id: number;
    name: string;
    values: Array<{
        name: string;
        picture: string;
        desc: string;
    }>;
}

export interface GoodDetail extends Good {
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
    hotByDay: Array<Good>;
    inventory: number;
    isCollect: string;
    isPreSale: boolean;
    mainPictures: Array<string>;
    mainVideos: Array<string>;
    oldPrice: string;
    recommends: string;
    salesCount: number;
    similarProducts: Array<Good>;
    skus: Array<Sku>;
    specs: Array<Spec>;
    spuCode: string;
    userAddresses: string;
    videoScale: number;
}
