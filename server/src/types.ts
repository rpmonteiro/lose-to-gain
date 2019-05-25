export interface User {
    name: string
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Maybe<T> = T | undefined

export interface FitbitWeightLog {
    bmi: number
    date: string
    weight: number
    fat: number
}

export interface FitbitRefreshTokenResponse {
    access_token: string
    refresh_token: string
}
