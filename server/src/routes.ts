import Router from 'koa-router'
import { authenticateUser } from './endpoints/auth'

const router = new Router()

router.post('/auth', authenticateUser)

export { router }
