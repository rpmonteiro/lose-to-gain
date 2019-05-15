import { BaseContext } from 'koa'
import { OAuth2Client } from 'google-auth-library'
import { config } from '../config'
import * as dbTypes from '../db-types'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'
import { Omit } from '../types'

const client = new OAuth2Client(config.googleAppId)

async function verify() {}
verify().catch(console.error)

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

    const googleTokenId = googleUserObject.sub
    let user: dbTypes.users | undefined = await ctx.db.tables.users.findOne({
        google_id: googleTokenId
    })
    if (!user) {
        user = await createNewUser(ctx, googleUserObject)
    }

    ctx.body = {
        user
    }
}

async function createNewUser(ctx: BaseContext, googleUserObject: TokenPayload) {
    const newUser: Omit<dbTypes.users, 'id'> = {
        email: googleUserObject.email as string,
        first_name: googleUserObject.given_name as string,
        last_name: googleUserObject.family_name as string,
        google_id: googleUserObject.sub
    }

    return ctx.db.tables.users.insertAndGet(newUser)
}
