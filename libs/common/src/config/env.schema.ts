import Joi from "joi";

export const ENV_SCHEMA =  Joi.object({
    PORT_GATEWAY: Joi.number().default(3000),
    PORT_GIFTCODE: Joi.number().default(3001),
    PORT_LOGGER: Joi.number().default(3002),
    PG_URL: Joi.string().required()
} as Joi.SchemaMap);
