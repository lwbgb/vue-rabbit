import type { Good } from "./Good";

export interface HeaderCategory {
    id: string;
    name: string
    picture: string
    children: Array<HeaderCategory>
    goods: Good
}
