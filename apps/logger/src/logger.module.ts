import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {LoggerController} from "./controllers/logger.controller";
import {MongooseModule} from '@nestjs/mongoose';
import {Log, LoggerService, LogSchema} from "@logger/providers/logget/logger.service";

@Module({
    imports: [ConfigModule,

        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{name: Log.name, schema: LogSchema}]),
    ],
    controllers: [LoggerController],
    providers: [LoggerService],
})
export class LoggerModule {
}
