import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, `../configs/${process.env.ENVIRONMENT}.env`) })

export interface AppConfig {
    port: number
    /**
     * Used for the session storage
     */
    appSecret: string
    googleClientId: string
    googleClientSecret: string
    googleCallbackURL: string
    debugLogging: boolean
    dbConnectionString: string
}

export const config: AppConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    appSecret: process.env.APP_SECRET || 'super-secret-key!',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    googleCallbackURL:
        process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/success',
    dbConnectionString: process.env.DB_CONNECTION_STRING || '',
    debugLogging: process.env.NODE_ENV === 'development'
}
