import type { Good } from './good';

export interface HeaderCategory {
    id: string;
    name: string;
    picture: string;
    children: Array<HeaderCategory>;
    goods: Array<Good>;
}
