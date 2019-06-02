import { Strategy } from 'passport-google-oauth2'
import { config } from '../config'
import passport from 'passport'
import { findUser, createNewUser } from '../repository/user'

passport.use(
    new Strategy(
        {
            clientID: config.googleClientId,
            clientSecret: config.googleClientSecret,
            callbackURL: 'http://localhost:5000/google/auth/callback',
            passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
            const userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                token: accessToken
            }
            done(null, userData)
        }
    )
)
