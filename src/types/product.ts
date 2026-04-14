import type { Goods } from './goods';

export interface ProductCategory {
    id: number;
    name: string;
    picture: string;
    children: Array<Product>;
    goods: Array<Goods>;
    saleInfo: string;
}

export interface Product {
    id: number;
    layer: number;
    name: string;
    parent: ProductCategory | null;
}
