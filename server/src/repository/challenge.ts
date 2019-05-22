import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'

// TODO: Left join query to match google_id to user_id
export function findUserChallenges(
    ctx: BaseContext,
    googleId: string
): Promise<dbTypes.challenges[]> {
    return ctx.db.query(
        `
        SELECT * FROM challenges c
        WHERE id IN (
            select challenge_id
            FROM users_challenges
            WHERE user_1 = $1
            OR user_2 = $1
        )
    `,
        [googleId]
    )
}
