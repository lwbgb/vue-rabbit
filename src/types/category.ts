import type { Product } from './product';
import type { Goods } from './goods';

export interface CategoryInfo {
    id: number;
    name: string;
    picture: string;
    children: Array<HeaderCategory>;
}

export interface HeaderCategory extends CategoryInfo {
    goods: Array<Goods>;
}

export interface SubCategory extends HeaderCategory {
    parentId: number;
    parentName: string;
    categories: Array<Product>;
    brands: Array<string>;
    saleProperties: Array<object>;
}
