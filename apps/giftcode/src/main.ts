import {NestFactory} from '@nestjs/core';
import {setup} from "./utils/bootstrap";
import { INestMicroservice} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GiftcodeModule} from "./giftcode.module";
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app: INestMicroservice = await NestFactory.createMicroservice(GiftcodeModule,{
        transport: Transport.TCP,
        options: {
            port: process.env.GIFTCODE_PORT,
        },
    });

    const configService = app.get(ConfigService);
    await setup(app, configService);

    console.log(`Giftcode micro service is listening at port: ${process.env.GIFTCODE_PORT}`);
    await app.listen();
}

bootstrap().then(() => console.log('Giftcode micro service is started!'));
