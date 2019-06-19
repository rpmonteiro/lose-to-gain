require('dotenv').config()
export interface AppConfig {
    port: number
    appSecret: string
    loggerLevel: string
    dbConnectionString: string
    googleAuthConfig: {
        clientID: string
        clientSecret: string
        callbackURL: string
    }
}

export const config: AppConfig = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    appSecret: process.env.APP_SECRET || 'super-secret-key!',
    dbConnectionString: process.env.DB_CONNECTION_STRING || '',
    loggerLevel: 'debug',
    googleAuthConfig: {
        clientID: process.env.GOOGLE_KEY || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        callbackURL: 'https://localhost:5000/google/callback'
    }
}
