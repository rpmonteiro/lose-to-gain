export interface UserVM {
    google_id: string
    fitbit_linked: boolean
    first_name: string
}

export interface ChallengeGoals {
    [key: string]: {
        targetWeight: number
    }
}

export interface Challenge {
    id: number
    start_date: string
    goals: ChallengeGoals
    end_date: string
    goal_description: string
    goal_prize: string
    goal_image?: string
}
