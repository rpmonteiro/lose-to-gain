export interface User {
    name: string
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
