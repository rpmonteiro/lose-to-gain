import { BaseContext } from 'koa'
import { OAuth2Client } from 'google-auth-library'
import { config } from '../config'
import * as dbTypes from '../db-types'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'
import { Omit } from '../types'
import { sanitizeGoogleEmail } from '../utils/string-utils'

const client = new OAuth2Client(config.googleAppId)

export async function authenticateUser(ctx: BaseContext) {
    const googleIdToken = ctx.request.body.googleToken
    if (!googleIdToken) {
        ctx.throw(400, 'no token!')
        return
    }
    const ticket = await client.verifyIdToken({
        idToken: googleIdToken,
        audience: config.googleAppId
    })
    const googleUserObject = ticket.getPayload()
    if (!googleUserObject) {
        ctx.throw(500, 'lalala no payload')
        return
    }

    let user: dbTypes.users | undefined = await ctx.db.tables.users.findOne({
        email: sanitizeGoogleEmail(googleUserObject.email)
    })

    if (user && !user.active) {
        user = await activateUser(ctx, user, googleUserObject)
    } else if (!user) {
        user = await createNewUser(ctx, googleUserObject)
    }

    ctx.body = {
        user
    }
}

// tslint:disable-next-line:max-line-length
async function createNewUser(
    ctx: BaseContext,
    googleUserObject: TokenPayload
): Promise<dbTypes.users> {
    const newUser: Omit<dbTypes.users, 'id'> = {
        email: sanitizeGoogleEmail(googleUserObject.email),
        first_name: googleUserObject.given_name as string,
        last_name: googleUserObject.family_name as string,
        google_id: googleUserObject.sub,
        active: true,
        invited_by: null
    }

    return ctx.db.tables.users.insertAndGet(newUser)
}

// tslint:disable-next-line:max-line-length
async function activateUser(
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
