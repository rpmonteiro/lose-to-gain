import { BaseContext } from 'koa'
import axios, { AxiosResponse } from 'axios'
import querystring from 'querystring'
import { findUser, saveUserFitbitAccessToken } from '../repository/user'

interface FitbitAuthResponse {
    access_token: string
    refresh_token: string
    user_id: string
}

const clientId = '22DPRT'

export async function fitbitAuth(ctx: BaseContext) {
    const { googleId, fitbitAuthCode } = ctx.request.body
    const user = await findUser(ctx, googleId)

    if (!user) {
        ctx.throw(400, "Invalid user id. User doesn't exist")
        return
    }

    // user is already authenticated with fitbit
    if (Boolean(user.fitbit_token)) {
        ctx.status = 200
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
