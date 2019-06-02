import express from 'express'
import passport from 'passport'
import { googleController } from '../controllers/auth'

export const authRouter = express.Router()
// Setting up the passport middleware for each of the OAuth providers
// const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile'] })
// const facebookAuth = passport.authenticate('facebook')
// const githubAuth = passport.authenticate('github')

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
// router.get('/twitter/callback', twitterAuth, authController.twitter)
// router.get('/facebook/callback', facebookAuth, authController.facebook)
// router.get('/github/callback', githubAuth, authController.github)
authRouter.get('/google/callback', googleAuth, googleController)

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
authRouter.use((req: Express.Request, res: Express.Response, next: Function) => {
    ;(req.session as Express.Session).socketId = req['query'].socketId
    next()
})

// Routes that are triggered on the client
// router.get('/twitter', twitterAuth)
authRouter.get('/google', googleAuth)
// router.get('/facebook', facebookAuth)
// router.get('/github', githubAuth)
