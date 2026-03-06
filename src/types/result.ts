export interface Result<T> {
    code: number;
    result: T | null;
    msg: string;
}

