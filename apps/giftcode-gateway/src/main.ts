import {NestFactory} from '@nestjs/core';
import {GiftcodeGatewayModule} from './giftcode-gateway.module';
import {setup} from "./utils/bootstrap";
import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(GiftcodeGatewayModule);
    let configService = app.get(ConfigService);

    await setup(app, configService);

    let port = configService.get<number>('PORT')
    console.log(`gateway is listening at port: ${port}`);
    await app.listen(port);
}

bootstrap().then(() => console.log('Gateway is started!'));
