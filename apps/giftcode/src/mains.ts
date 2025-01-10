import { NestFactory } from '@nestjs/core';
import { GiftcodeModule } from './giftcode.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(GiftcodeModule,{
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();
