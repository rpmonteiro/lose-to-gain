import { Joi } from 'koa-joi-router'

export const challengeValidationSchema = Joi.object({
    start_date: Joi.date()
        .timestamp()
        .required(),
    end_date: Joi.date()
        .timestamp()
        .required(),
    goal_description: Joi.string().required(),
    goal_prize: Joi.string().required(),
    image: Joi.string(),
    goals: Joi.object()
        .length(2)
        .required()
})
