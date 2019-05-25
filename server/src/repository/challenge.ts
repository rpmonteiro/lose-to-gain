import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
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

export function insertChallenge(
    ctx: BaseContext,
    challenge: Omit<dbTypes.challenges, 'id'>
): Promise<dbTypes.challenges> {
    return ctx.db.tables.challenges.insertAndGet(challenge)
}

export function updateChallengeRow(
    ctx: BaseContext,
    challenge: dbTypes.challenges
): Promise<dbTypes.challenges> {
    return ctx.db.tables.challenges.updateAndGetOne({ id: challenge.id }, challenge)
}
