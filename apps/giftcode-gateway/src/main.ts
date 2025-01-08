import { NestFactory } from '@nestjs/core';
import { GiftcodeGatewayModule } from './giftcode-gateway.module';
import {setup} from "./utils/bootstrap";
import {INestApplication} from "@nestjs/common";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(GiftcodeGatewayModule);

  await setup(app);

  await app.listen(process.env.port ?? 3000);
}
bootstrap().then(() => console.log('Gateway is running'));
