import {Module} from '@nestjs/common';
import {AuthModule} from "./modules/auth/auth.module";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import { ConfigModule } from '@common/config/config.module';
import {GiftcodeController} from "@gateway/controllers/giftcode.controller";
import {GiftcodeService} from "@gateway/providers/giftcode/giftcode.service";
import {WalletController} from "@gateway/controllers/wallet.controller";
import {WalletService} from "@gateway/providers/wallet/wallet.service";
import {LoggerService} from "@gateway/providers/log/log.service";
import {LoggerController} from "@gateway/controllers/log.controller";

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
        {
            provide: 'LOGGER_SERVICE',
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {port: configService.get<number>('LOGGER_PORT')}
                }),
            inject: [ConfigService],
        },

        GiftcodeService, WalletService, LoggerService
    ],

    controllers:[GiftcodeController, WalletController, LoggerController]
})
export class GiftcodeGatewayModule {
}
