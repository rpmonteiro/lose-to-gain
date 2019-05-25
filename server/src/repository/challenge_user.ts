import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
import { Omit } from '../types'

export function insertUserChallengeRelation(
    ctx: BaseContext,
    challenge: Omit<dbTypes.users_challenges, 'id'>
) {
    return ctx.db.tables.users_challenges.insert(challenge)
}
