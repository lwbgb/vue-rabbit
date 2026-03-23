import type { Good } from './good';

export interface HeaderCategory {
    id: number;
    name: string;
    picture: string;
    children: Array<HeaderCategory>;
    goods: Array<Good>;
}
