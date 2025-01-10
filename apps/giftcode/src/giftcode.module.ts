import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {GiftcodeController} from "@giftcode/controller/giftcode.controller";
import {GiftcodeService} from "@giftcode/providers/giftcode/giftcode.service";
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";


@Module({
    imports: [ConfigModule],
    controllers: [GiftcodeController],
    providers: [
        {
            provide: 'LOGGER_SERVICE',
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({// @ts-ignore
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<number>('RMQ_URL')],
                        queue: configService.get<number>('LOGGER_RMQ_QUEUE'),
                        queueOptions: {
                            durable: false
                        },
                    },
                }),
            inject: [ConfigService],
        },

        GiftcodeService
    ]
})
export class GiftcodeModule {
}
