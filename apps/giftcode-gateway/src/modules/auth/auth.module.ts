import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {AuthGuard} from "./providers/auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [ConfigModule, JwtModule.register({
        secret: new ConfigService().get<string>("AUTH_JWT_KEY")
    },)],

    exports: [AuthGuard,],
    providers: [AuthGuard]
})
export class AuthModule {
}
