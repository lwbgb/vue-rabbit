import type { Good } from './good';

export interface Product {
    id: number;
    name: string;
    picture: string;
    children: Array<Cate>;
    goods: Array<Good>;
    saleInfo: string;
}

export interface Cate {
    id: number;
    layer: number;
    name: string;
    parent: Product | null;
}
