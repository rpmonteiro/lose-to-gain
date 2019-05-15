import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import winston from 'winston'
import bodyParser from 'koa-bodyparser'

import { logger } from './logger'
import { config } from './config'
import { router } from './routes'
import { PgDb } from 'pogi'

const app = new Koa()

async function start() {
    try {
        const pgdb = await PgDb.connect({ connectionString: config.dbConnectionString })
        app.context.db = pgdb.db
        app.use(helmet())
        app.use(cors())
        app.use(logger(winston))
        app.use(bodyParser())
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.listen(config.port)
    } catch (err) {
        throw new Error(err)
    }

    console.log(`Server running on port ${config.port}`)
}

start()
