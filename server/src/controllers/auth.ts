import { Context } from 'koa'
import passport from 'passport'

passport.serializeUser((user, done) => {
    done(null, user)
})

export async function googleAuthCallback(ctx: Context) {
    passport.authenticate('google', { failureRedirect: '/', session: false }),
        (req: any, res: any) => {
            console.log('wooo we authenticated, here is our user object:', req.user, { req, res })
            res.json(req.user)
        }
}
