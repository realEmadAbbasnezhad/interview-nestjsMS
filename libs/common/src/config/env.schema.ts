import * as Joi from 'joi'

export const ENV_SCHEMA =  Joi.object({
    PORT_LOGGER: Joi.number().default(3002),
    PG_URL: Joi.string().required(),

    AUTH_JWT_KEY: Joi.string().required(),

    PORT: Joi.number().required(),
    GIFTCODE_PORT: Joi.number().required(),
} as Joi.SchemaMap);
