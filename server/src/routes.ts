import Router from 'koa-router'
import { getUser } from './endpoints/user'
import { googleAuth } from './endpoints/google-auth'
import { fitbitAuth } from './endpoints/fitbit-auth'
import { getChallenges } from './endpoints/challenge'

const router = new Router()

router.post('/google-auth', googleAuth)
router.post('/fitbit-auth', fitbitAuth)
router.get('/user/:google_id', getUser)
router.get('/challenges/:google_id', getChallenges)

export { router }
