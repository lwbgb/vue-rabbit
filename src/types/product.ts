import type { Good } from './good';

export interface ProductCategory {
    id: number;
    name: string;
    picture: string;
    children: Array<Product>;
    goods: Array<Good>;
    saleInfo: string;
}

export interface Product {
    id: number;
    layer: number;
    name: string;
    parent: ProductCategory | null;
}
