export interface Good {
    id: string;
    name: string;
    price: string;
    orderNum: number;
    desc: string;
    picture: string;
}

export interface HeaderCategory {
    id: string;
    name: string;
    picture: string;
    children: Array<HeaderCategory>;
    goods: Array<Good>;
}
