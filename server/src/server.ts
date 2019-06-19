import express from 'express'
import path from 'path'
import fs from 'fs'
import https from 'https'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import socketio from 'socket.io'
import { passportInit } from './passport-init'
import { config } from './config'
import { authRouter } from './routes/auth'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { PgDb } from 'pogi'

const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

process.on('uncaughtException', (e) => {
    console.log(e)
    process.exit(1)
})

process.on('unhandledRejection', (e) => {
    console.log(e)
    process.exit(1)
})

const app = express()
const server = https.createServer(certOptions, app)

async function start() {
    try {
        const db = await PgDb.connect({ connectionString: config.dbConnectionString })
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))

        // Setup for passport and to accept JSON objects
        app.use(express.json())
        app.use(passport.initialize())
        passportInit()

        // Accept requests from the client
        app.use(
            cors({
                credentials: true,
                origin: ['https://127.0.0.1:3000', 'https://localhost:3000']
            })
        )

        // saveUninitialized: true allows us to attach the socket id to the session
        // before we have athenticated the user
        app.use(
            session({
                name: 'sid',
                resave: true,
                saveUninitialized: true,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 120
                },
                rolling: true,
                secret: config.appSecret
            })
        )
        app.use(helmet())

        // Connecting sockets to the server and adding them to the request
        // so that we can access them later in the controller
        app.set('io', socketio(server))
        // Direct other requests to the auth router
        app.use('/', authRouter)

        server.listen(config.port, () => {
            console.log(`Server listening on port ${config.port} :-)`)
        })
    } catch (err) {
        throw new Error(err)
    }
}

start()
