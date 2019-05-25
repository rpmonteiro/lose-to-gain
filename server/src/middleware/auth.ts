import { Context } from 'koa'

export async function requireLogin(ctx: Context, next: Function) {
    if (ctx.isAuthenticated()) {
        await next()
    } else {
        ctx.status = 401
        ctx.body = {
            errors: [{ title: 'Login required', status: 401 }]
        }
    }
}
