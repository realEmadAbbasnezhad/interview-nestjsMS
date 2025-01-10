import {Module} from '@nestjs/common';
import {AuthModule} from "./modules/auth/auth.module";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import { ConfigModule } from '@common/config/config.module';
import {GiftcodeController} from "@gateway/controllers/giftcode.controller";
import {GiftcodeService} from "@gateway/providers/giftcode/giftcode.service";

@Module({
    imports: [AuthModule, ConfigModule],
    providers: [
        {
            provide: 'GIFTCODE_SERVICE',
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {port: configService.get<number>('GIFTCODE_PORT')}
                }),
            inject: [ConfigService],
        },

        GiftcodeService
    ],

    controllers:[GiftcodeController]
})
export class GiftcodeGatewayModule {
}
