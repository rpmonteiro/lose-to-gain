import { BaseContext } from 'koa'
import * as dbTypes from '../db-types'
import axios, { AxiosResponse } from 'axios'
import querystring from 'querystring'

interface FitbitAuthResponse {
    access_token: string
    refresh_token: string
    user_id: string
}

const clientId = '22DPRT'

export async function fitbitAuth(ctx: BaseContext) {
    const { userId, fitbitAuthCode } = ctx.request.body

    if (!userId || !fitbitAuthCode) {
        ctx.throw(400, 'the data is not here!')
        return
    }

    const user: dbTypes.users | undefined = await ctx.db.tables.users.findOne({ id: userId })

    if (!user) {
        ctx.throw(400, "Invalid user id. User doesn't exist")
        return
    }

    // user is already authenticated with fitbit
    if (Boolean(user.fitbit_token)) {
        ctx.body = {
            lala: 'lala 123'
        }
        return
    }

    try {
        const res = await getFitbitAccessToken(fitbitAuthCode)
        await saveUserFitbitAccessToken(ctx, user.id, res.data.access_token)
        ctx.status = 200
    } catch (error) {
        console.log('error!!', error)
        ctx.throw(500, 'something went wrong!', error)
    }
}

// tslint:disable-next-line:max-line-length
function getFitbitAccessToken(fitbitAuthCode: string): Promise<AxiosResponse<FitbitAuthResponse>> {
    return axios.post<FitbitAuthResponse>(
        'https://api.fitbit.com/oauth2/token',
        querystring.stringify({
            clientId,
            code: fitbitAuthCode,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/fitbit-auth'
        }),
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic MjJEUFJUOjlkNjg4YzgxMjY4ZmFiYzdiMDFlZThjMTJmMmMyOGE1'
            }
        }
    )
}

function saveUserFitbitAccessToken(
    ctx: BaseContext,
    userId: number,
    accessToken: string
): Promise<number> {
    return ctx.db.tables.users.updateOne({ id: userId }, { fitbit_token: accessToken })
}
