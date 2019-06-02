import * as dbTypes from '../db-types'
import { FitbitWeightLog, FitbitRefreshTokenResponse } from '../types'
import Axios, { AxiosPromise } from 'axios'
import querystring from 'querystring'

export async function getMissingWeightLogsFromFitbit(missingMonths: string[], user: dbTypes.users) {
    const fitbitWeightDataPoints: FitbitWeightLog[] = []

    missingMonths.forEach(async (dateString) => {
        try {
            const response = await getFitbitWeightLogsForMonth(dateString, user)
            fitbitWeightDataPoints.concat(response.data)
        } catch (error) {
            console.log('error getting fitbit weight data', error)
        }
    })
}

function getFitbitWeightLogsForMonth(
    dateString: string,
    user: dbTypes.users
): AxiosPromise<FitbitWeightLog> {
    return Axios.get(`https://api.fitbit.com/1/user/-/body/log/weight/date/${dateString}/1m.json`, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${user.fitbit_access_token}`
        }
    })
}

// function refreshAccessToken(user: dbTypes.users): AxiosPromise<FitbitRefreshTokenResponse> {
//     return Axios.post(
//         'https://api.fitbit.com/oauth2/token',
//         querystring.stringify({
//             grant_type: 'refresh_token',
//             refresh_token: user.fitbit_refresh_token
//         }),
//         {
//             headers: {
//                 'Content-type': 'application/x-www-form-urlencoded',
//                 Authorization: 'Basic MjJEUFJUOjlkNjg4YzgxMjY4ZmFiYzdiMDFlZThjMTJmMmMyOGE1'
//             }
//         }
//     )
// }
