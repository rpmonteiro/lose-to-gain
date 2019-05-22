import { BaseContext } from 'koa'
import { findUser } from '../repository/user'

export async function getUser(ctx: BaseContext) {
    const googleId = ctx.params.google_id

    if (!googleId) {
        ctx.throw(400, 'Invalid user id')
        return
    }

    const user = await findUser(ctx, googleId)

    if (!user) {
        ctx.throw(404, 'User not found')
        return
    }
}
