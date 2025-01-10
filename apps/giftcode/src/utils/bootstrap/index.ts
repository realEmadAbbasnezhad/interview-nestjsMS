import {INestApplication} from "@nestjs/common";
import {setupAuth} from "./auth";
import {setupSwagger} from "./swagger";
import {setupValidatorAndExceptions} from "@gateway/utils/bootstrap/validatorAndExceptions";
import {ConfigService} from "@nestjs/config";
import {setupMicroservice} from "@gateway/utils/bootstrap/microservice";

export async function setup(app: INestApplication, config: ConfigService) {
    await setupAuth(app)
    await setupValidatorAndExceptions(app)

    await setupMicroservice(app, config)

    await setupSwagger(app, config)
}