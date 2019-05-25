export interface UserVM {
    google_id: string
    fitbit_linked: boolean
    first_name: string
}

export interface ChallengeData {
    [key: string]: {
        targetWeight: number
    }
}

export type WeightLog = [Date, number][]
