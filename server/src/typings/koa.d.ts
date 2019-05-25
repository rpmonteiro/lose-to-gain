import * as dbTypes from '../db-types'
import { PgDb } from 'pogi'

declare module 'koa' {
    interface Context {
        db: PgDb
    }
}
