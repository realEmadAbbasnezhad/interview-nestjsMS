import Joi from "joi";

export const ENV_SCHEMA =  Joi.object({
    PORT: Joi.number().default(3000),
    PG_URL: Joi.string().required()
} as Joi.SchemaMap);
