import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'
import { sanitizeGoogleEmail } from '../utils/string-utils'
import { Omit, Maybe } from '../types'

export function findUser(ctx: BaseContext, googleId: string): Promise<Maybe<dbTypes.users>> {
    return ctx.db.tables.user.findOne({ google_id: googleId })
}

export function createNewUser(
    ctx: BaseContext,
    googleUserObject: TokenPayload
): Promise<dbTypes.users> {
    const newUser: Omit<dbTypes.users, 'id'> = {
        email: sanitizeGoogleEmail(googleUserObject.email),
        first_name: googleUserObject.given_name as string,
        last_name: googleUserObject.family_name as string,
        fitbit_token: null,
        weight_history: {},
        google_id: googleUserObject.sub,
        active: true,
        invited_by: null
    }

    return ctx.db.tables.users.insertAndGet(newUser)
}

export function activateUser(
    ctx: BaseContext,
    user: dbTypes.users,
    googleUserObject: TokenPayload
): Promise<dbTypes.users> {
    user.active = true
    user.first_name = googleUserObject.given_name || ''
    user.last_name = googleUserObject.family_name || ''
    user.google_id = googleUserObject.sub

    return ctx.db.tables.users.insertAndGet(user)
}

export function saveUserFitbitAccessToken(
    ctx: BaseContext,
    userId: number,
    accessToken: string
): Promise<number> {
    return ctx.db.tables.users.updateOne({ id: userId }, { fitbit_token: accessToken })
}
