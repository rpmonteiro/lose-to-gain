import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'
import { sanitizeGoogleEmail } from '../utils/string-utils'
import { Omit } from '../types'

export function findUser(ctx: BaseContext, googleId: string): Promise<dbTypes.users> {
    return ctx.db.tables.user.findOne({ google_id: googleId })
}

// tslint:disable-next-line
export function createNewUser(
    ctx: BaseContext,
    googleUserObject: TokenPayload
): Promise<dbTypes.users> {
    const newUser: Omit<dbTypes.users, 'id'> = {
        email: sanitizeGoogleEmail(googleUserObject.email),
        first_name: googleUserObject.given_name as string,
        last_name: googleUserObject.family_name as string,
        fitbit_token: null,
        google_id: googleUserObject.sub,
        active: true,
        invited_by: null
    }

    return ctx.db.tables.users.insertAndGet(newUser)
}

// tslint:disable-next-line:max-line-length
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
