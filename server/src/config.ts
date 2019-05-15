import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, `../configs/${process.env.ENVIRONMENT}.env`) })

export interface AppConfig {
    port: number
    googleAppId: string
    debugLogging: boolean
    dbConnectionString: string
}

export const config: AppConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    googleAppId: process.env.GOOGLE_APP_ID || '',
    dbConnectionString: process.env.DB_CONNECTION_STRING || '',
    debugLogging: process.env.NODE_ENV === 'development'
}
