import {INestApplication} from "@nestjs/common";
import {setupAuth} from "./auth";
import {setupSwagger} from "./swagger";

export async function setup(app :INestApplication) {
    await setupAuth(app)
    await setupSwagger(app)
}