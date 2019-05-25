import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import winston from 'winston'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import RedisStore from 'koa-redis'
import { logger } from './logger'
import { config } from './config'
import { authRouter, userRouter, challengeRouter } from './routes'
import { PgDb } from 'pogi'
import passport from 'koa-passport'
import { requireLogin } from './middleware/auth'

const app = new Koa()
const redisStore = RedisStore({})

async function start() {
    try {
        // setup DB
        const pgdb = await PgDb.connect({ connectionString: config.dbConnectionString })
        app.context.db = pgdb.db

        // session
        app.keys = [config.appSecret]
        app.use(session({ store: redisStore }, app))

        // auth stuff
        app.use(passport.initialize())
        app.use(passport.session())

        // nice middlewares
        app.use(helmet())
        app.use(cors())
        app.use(logger(winston))
        app.use(session({}, app))
        app.use(bodyParser())

        // routes
        app.use(requireLogin)
        app.use(authRouter.middleware())
        app.use(userRouter.middleware())
        app.use(challengeRouter.middleware())

        app.listen(config.port)
    } catch (err) {
        throw new Error(err)
    }

    console.log(`Server running on port ${config.port}`)
}

start()
