import {INestApplication} from "@nestjs/common";
import {AuthGuard} from "../../modules/auth/providers/auth/auth.guard";
import { ConfigService } from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

export async function setup(app: INestApplication) {
    app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(ConfigService)))
}