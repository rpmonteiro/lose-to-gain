import { BaseContext } from 'koa'
import { findUser } from '../repository/user'
import * as dbTypes from '../db-types'
import { WeightLog } from '../../../shared-types'
import { extendMoment } from 'moment-range'
import * as moment from 'moment'
const { range } = extendMoment(moment)

export async function getUser(ctx: BaseContext) {
    const googleId = ctx.params.google_id
    const user = await findUser(ctx, googleId)

    if (!user) {
        ctx.throw(404, 'User not found')
        return
    }

    ctx.status = 200
    ctx.body = user
}

export async function getUserWeightLog(
    ctx: BaseContext,
    user: dbTypes.users,
    startDate: Date,
    endDate: Date
) {
    const currWeightLog = extractUserWeightLog(user)
    const lastWeightDate = getLastWeightLogDate(currWeightLog)
    const shouldLoadWeightPoints = lastWeightDate < endDate

    if (!shouldLoadWeightPoints) {
        return currWeightLog
    }

    const missingMonths = getMonthsDiffInFitbitFormat(startDate, new Date())
    const missingData = getMissingWeightLogsFromFitbit(missingMonths, user)
}

function extractUserWeightLog(user: dbTypes.users): WeightLog {
    return (user.weight_history || []) as WeightLog
}

function getMonthsDiffInFitbitFormat(start: Date, end: Date): string[] {
    const timeRange = range(moment.utc(start), moment.utc(end))
    const monthsDiff = []

    for (const month of timeRange.by('month')) {
        monthsDiff.push(month.format('YYYY-MM-DD').toString())
    }

    return monthsDiff
}

function getLastWeightLogDate(weightLog: WeightLog): Date {
    const lastPoint = weightLog[weightLog.length - 1] || []
    return lastPoint[0] || new Date('1970')
}
