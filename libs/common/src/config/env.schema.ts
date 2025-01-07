import Joi from "joi";

export const ENV_SCHEMA =  Joi.object({
    PORT: Joi.number().default(3000)
} as Joi.SchemaMap);
