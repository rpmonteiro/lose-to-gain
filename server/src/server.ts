import express from 'express'
import path from 'path'
import fs from 'fs'
import https from 'https'
import http from 'http'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import socketio from 'socket.io'
import { passportInit } from './passport-init'
import { appConfig } from './config'
import { authRouter } from './routes/auth'

const app = express()
let server

// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
    server = http.createServer(app)
}
// We are not in production so load up our certificates to be able to
// run the server in https mode locally
else {
    const certOptions = {
        key: fs.readFileSync(path.resolve('certs/server.key')),
        cert: fs.readFileSync(path.resolve('certs/server.crt'))
    }
    server = https.createServer(certOptions, app)
}

// Setup for passport and to accept JSON objects
app.use(express.json())
app.use(passport.initialize())
passportInit()

// Accept requests from the client
app.use(
    cors({
        origin: ['https://127.0.0.1:3000', 'https://localhost:3000']
    })
)

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(
    session({
        secret: appConfig.sessionSecret,
        resave: true,
        saveUninitialized: true
    })
)

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
app.set('io', socketio(server))
// Direct other requests to the auth router
app.use('/', authRouter)

server.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port} :-)`)
})
