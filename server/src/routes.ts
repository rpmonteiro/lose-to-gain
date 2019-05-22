import Router from 'koa-router'
import { googleAuth } from './endpoints/google-auth'
import { fitbitAuth } from './endpoints/fitbit-auth'

const router = new Router()

router.post('/google-auth', googleAuth)
router.post('/fitbit-auth', fitbitAuth)

export { router }
