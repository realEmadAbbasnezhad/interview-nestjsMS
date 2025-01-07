import { NestFactory } from '@nestjs/core';
import { LoggerModule } from './logger.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LoggerModule,{
    transport: Transport.MQTT,
    options: {
      port: 3002,
    },
  });
  await app.listen();
}
bootstrap();
