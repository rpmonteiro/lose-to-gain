import { PgDb } from 'pogi'
import { config } from './config'

const dbOptions = {
    connectionString: config.dbConnectionString,
    logger: console
}

export const connectDb = () => PgDb.connect(dbOptions)
export const getDb = () => PgDb.getInstance(dbOptions)
