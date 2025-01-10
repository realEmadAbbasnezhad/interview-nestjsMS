import { Module } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'GATEWAY_SERVICE',
      useFactory: (configService: ConfigService) =>
          ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {port: configService.get<number>('GATEWAY_PORT')}
          }),
      inject: [ConfigService],
    }
  ]
})
export class GiftcodeModule {}
