import { PgDb } from 'pogi'
import { config } from '../config'

export async function getDb() {
    return PgDb.getInstance({
        connectionString: config.dbConnectionString,
        logger: console
    })
}
