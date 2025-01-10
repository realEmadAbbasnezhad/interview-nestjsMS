import Joi from 'joi';

export const ENV_SCHEMA = Joi.object({
    PORT: Joi.number().required(),
    PG_URL: Joi.string().required(),
    AUTH_JWT_KEY: Joi.string().required(),

    GIFTCODE_PORT: Joi.number().required(),
    REDIS_URL: Joi.string().required(),
} as Joi.SchemaMap);
