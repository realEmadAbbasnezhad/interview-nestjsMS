// OK!

import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {AuthGuard} from "./providers/auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "@gateway/modules/auth/providers/auth/auth.service";
import {EncryptModule} from "@common/encrypt/encrypt.module";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
    imports: [ConfigModule, EncryptModule,

        JwtModule.register({
            secret: new ConfigService().get<string>("AUTH_JWT_KEY")
        },)],

    exports: [AuthGuard],
    controllers: [AuthController],
    providers: [
        {
            provide: 'LOGGER_SERVICE',
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {port: configService.get<number>('LOGGER_PORT')}
                }),
            inject: [ConfigService],
        },

        AuthGuard, AuthService
    ]
})
export class AuthModule {
}
