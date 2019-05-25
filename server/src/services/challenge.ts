import { BaseContext } from 'koa'
import { findUserChallenges, insertChallenge, updateChallengeRow } from '../repository/challenge'
import * as dbTypes from '../db-types'
import { Omit } from '../types'
import { insertUserChallengeRelation } from '../repository/challenge_user'
import { findUser } from '../repository/user'
import { ChallengeData, WeightLog } from '../../../shared-types'
import { getUserWeightLog } from './user'

export async function getChallenges(ctx: BaseContext) {
    const googleId = ctx.params.google_id

    try {
        const challenges = await findUserChallenges(ctx, googleId)
        challenges.forEach((c) => addWeightDataToChallenge(ctx, c))
        ctx.body = challenges
    } catch (error) {
        ctx.throw(500, 'An error has occured')
    }
}

async function addWeightDataToChallenge(ctx: BaseContext, challenge: dbTypes.challenges) {
    const { start_date: startDate, end_date: endDate } = challenge
    const users = Object.keys(challenge.data as ChallengeData)
    const user1 = (await findUser(ctx, users[0])) as dbTypes.users
    const user2 = (await findUser(ctx, users[1])) as dbTypes.users

    const user1WeightLog: WeightLog = getUserWeightLog(ctx, user1, startDate, endDate)
    const user2WeightLog: WeightLog = getUserWeightLog(ctx, user2, startDate, endDate)
}

export async function createChallenge(ctx: BaseContext) {
    const challengeData: Omit<dbTypes.challenges, 'id'> = ctx.request.body.challenge
    const users = Object.keys(challengeData.data as ChallengeData)
    const challenge = await insertChallenge(ctx, challengeData)

    const user1 = await findUser(ctx, users[0])
    const user2 = await findUser(ctx, users[1])

    if (!user1 || !user2) {
        ctx.throw(400, 'invalid user ids')
        return
    }

    await insertUserChallengeRelation(ctx, {
        challenge_id: challenge.id,
        user_1: user1.id,
        user_2: user2.id
    })
}

export async function updateChallenge(ctx: BaseContext) {
    const challengeData: dbTypes.challenges = ctx.request.body.challenge
    await updateChallengeRow(ctx, challengeData)
}
