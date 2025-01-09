import {INestApplication} from "@nestjs/common";
import {setupAuth} from "./auth";
import {setupSwagger} from "./swagger";
import {setupValidatorAndExceptions} from "@gateway/utils/bootstrap/validatorAndExceptions";

export async function setup(app :INestApplication) {
    await setupAuth(app)
    await setupSwagger(app)
    await setupValidatorAndExceptions(app)
}