import { BaseContext } from 'koa'
import { OAuth2Client } from 'google-auth-library'
import { config } from '../config'
import * as dbTypes from '../db-types'
import { sanitizeGoogleEmail } from '../utils/string-utils'
import { UserVM } from '../../../shared-types'
import { activateUser, createNewUser } from '../repository/user'

const client = new OAuth2Client(config.googleAppId)

export async function googleAuth(ctx: BaseContext) {
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

    ctx.body = toUserVM(user)
}

function toUserVM(user: dbTypes.users): UserVM {
    return {
        google_id: user.google_id || '',
        first_name: user.first_name || '',
        fitbit_linked: Boolean(user.fitbit_token)
    }
}
