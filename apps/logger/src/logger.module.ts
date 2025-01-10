import { Module } from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {LoggerController} from "./controllers/logger.controller";

@Module({
  imports: [ConfigModule],
  controllers: [LoggerController],
  providers: [],
})
export class LoggerModule {}
