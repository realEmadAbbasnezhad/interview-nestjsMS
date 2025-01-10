// OK!

import {INestApplication} from "@nestjs/common";
import {AuthGuard} from "@gateway/modules/auth/providers/auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";

export async function setupAuth(app: INestApplication) {
    app.useGlobalGuards(new AuthGuard(app.get(JwtService), new Reflector()))
    app.enableCors({
        origin: 'localhost',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });
}