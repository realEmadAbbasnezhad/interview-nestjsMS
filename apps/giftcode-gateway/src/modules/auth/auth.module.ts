import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {AuthGuard} from "./providers/auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AuthController} from "./controllers/auth.controller";
import {UserController} from "./controllers/user.controller";
import {AuthService} from "@gateway/modules/auth/providers/auth/auth.service";
import {EncryptModule} from "@common/encrypt/encrypt.module";

@Module({
    imports: [ConfigModule, EncryptModule,

        JwtModule.register({
            secret: new ConfigService().get<string>("AUTH_JWT_KEY")
        },)],

    exports: [AuthGuard],
    controllers: [AuthController, UserController],
    providers: [AuthGuard, AuthService]
})
export class AuthModule {
}
