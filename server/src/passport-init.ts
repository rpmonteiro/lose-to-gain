import passport from 'passport'
// import { Strategy: TwitterStrategy } from 'passport-twitter'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { appConfig } from './config'
// import { Strategy: FacebookStrategy } from 'passport-facebook'
// import { Strategy: GithubStrategy} from 'passport-github'

export const passportInit = () => {
    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))

    // The callback that is invoked when an OAuth provider sends back user
    // information. Normally, you would save the user to the database
    // in this callback and it would be customized for each provider
    const callback = (accessToken: any, refreshToken: any, profile: any, cb: Function) =>
        cb(null, profile)

    // Adding each OAuth provider's strategy to passport
    // passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
    passport.use(new GoogleStrategy(appConfig.googleAuthConfig, callback))
    // passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
    // passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}
