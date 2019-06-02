import * as dbTypes from '../db-types'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'
import { sanitizeGoogleEmail } from '../utils/string-utils'
import { Omit, Maybe } from '../types'
import { getDb } from '../utils/get-db'

export async function findUser(googleId: string): Promise<Maybe<dbTypes.user>> {
    const db = await getDb()
    return db.tables.user.findOne({ googleId })
}

export async function createNewUser(data: TokenPayload): Promise<dbTypes.user> {
    const db = await getDb()
    const newUser: Omit<dbTypes.user, 'id'> = {
        email: sanitizeGoogleEmail(data.email),
        weightLogs: [],
        firstName: data.given_name as string,
        lastName: data.family_name as string,
        googleId: data.sub
    }

    return db.tables.users.insertAndGet(newUser)
}
