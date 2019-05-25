// import Router from 'koa-router'
import { getUser } from './services/user'
import { googleAuth } from './services/google-auth'
import { fitbitAuth } from './services/fitbit-auth'
import { createChallenge, updateChallenge, getChallenges } from './services/challenge'
import Router, { Joi, Spec } from 'koa-joi-router'
import { challengeValidationSchema } from './validation-schemas/challenge'
import { requireLogin } from './middleware/auth'

const userRoutes: Spec[] = [
    {
        method: 'get',
        path: '/user/:google_id',
        handler: getUser,
        validate: {
            params: {
                google_id: Joi.string()
                    .required()
                    .min(5)
            }
        }
    }
]
const userRouter = Router().use(userRoutes)

const authRoutes: Spec[] = [
    {
        method: 'post',
        path: '/google-auth',
        handler: googleAuth,
        validate: {
            body: {
                googleToken: Joi.string().required()
            }
        }
    },
    {
        method: 'post',
        path: '/fitbit-auth',
        handler: fitbitAuth,
        validate: {
            body: {
                googleId: Joi.string().required(),
                fitbitAuthCode: Joi.string().required()
            }
        }
    }
]
const authRouter = Router().use(authRoutes)

const challengeRoutes: Spec[] = [
    {
        pre: requireLogin,
        method: 'get',
        path: '/challenges',
        handler: getChallenges,
        validate: {
            params: {
                google_id: Joi.string().required()
            }
        }
    },
    {
        pre: requireLogin,
        method: 'post',
        path: '/challenges',
        handler: createChallenge,
        validate: {
            body: challengeValidationSchema
        }
    },
    {
        pre: requireLogin,
        method: 'put',
        path: '/challenges',
        handler: updateChallenge,
        validate: {
            body: {
                id: Joi.number().required(),
                ...challengeValidationSchema
            }
        }
    }
]
const challengeRouter = Router().use(challengeRoutes)

export { authRouter, userRouter, challengeRouter }
