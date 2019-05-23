import { BaseContext } from 'koa'
import { findUserChallenges, insertChallenge } from '../repository/challenge'
import { Challenge } from '../../../shared-types'

export async function getChallenges(ctx: BaseContext) {
    const googleId = ctx.params.google_id

    if (!googleId) {
        ctx.throw(400, 'No userID.')
        return
    }

    try {
        const challenges = await findUserChallenges(ctx, googleId)
        ctx.body = challenges
    } catch (error) {
        ctx.throw(500, 'An error has occured')
    }
}

export async function createChallenge(ctx: BaseContext) {
    const challengeData: Partial<Challenge> = ctx.request.body
    const { start_date, end_date, goal_description, goal_prize, goals } = challengeData

    if (
        !start_date ||
        !end_date ||
        !goal_description ||
        !goal_prize ||
        !goals ||
        (goals && Object.keys(goals).length !== 2)
    ) {
        ctx.throw(400, 'Incomplete data')
        return
    }

    // tslint:disable-next-line:max-line-length
    // TS seems to be dumb and not recognize that I already checked the object keys for undefined values...
    await insertChallenge(ctx, {
        start_date,
        end_date,
        goal_description,
        goal_prize,
        goals
    })
}
