export interface Result<T> {
    code: number;
    result: T | null;
    msg: string;
}

export interface PageResult<T> {
    page: number;
    pageSize: number;
    pages: number;
    counts: number;
    items: Array<T>;
}
