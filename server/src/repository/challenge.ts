import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
import { Challenge } from '../../../shared-types'
import { Omit } from '../types'

export function findUserChallenges(
    ctx: BaseContext,
    googleId: string
): Promise<dbTypes.challenges[]> {
    return ctx.db.query(
        `
        SELECT * FROM challenges c
        WHERE id IN (
            SELECT challenge_id
            FROM users_challenges
            WHERE user_1 = (
                SELECT id FROM users WHERE google_id = $1
            )
            OR user_2 = (
                SELECT id FROM users WHERE google_id = $1
            )
        )
    `,
        [googleId]
    )
}

/*
    Create new challenge row and new row on the pivot table users_challenges
*/
export function insertChallenge(ctx: BaseContext, challenge: Omit<Challenge, 'id'>) {
    const users = Object.keys(challenge.goals)

    return ctx.db.tables.challenges.insertAndGet(challenge).then((newChallengeRow: Challenge) =>
        ctx.db.tables.users_challenges.insert({
            challenge_id: newChallengeRow.id,
            user_1: users[0],
            user_2: users[1]
        })
    )
}
