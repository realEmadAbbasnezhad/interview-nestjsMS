import { NestFactory } from '@nestjs/core';
import { GiftcodeGatewayModule } from './giftcode-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GiftcodeGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
