import {NestFactory} from '@nestjs/core';
import {Transport} from "@nestjs/microservices";
import {LoggerModule} from "./logger.module";
import * as process from "node:process";

async function bootstrap() {
    const app = await NestFactory.create(LoggerModule);
    const rabbitMQMicroservice = app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.LOGGER_RMQ_QUEUE,
            queueOptions: {
                durable: true
            },
        },
    });
    const tcpMicroservice = app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            port: process.env.LOGGER_PORT,
        },
    });

    console.log(`Logger micro service is listening at port:
     TCP:${process.env.LOGGER_PORT} RABBITMQ:${process.env.LOGGER_RMQ_QUEUE}`);
    await app.startAllMicroservices();
}

bootstrap().then(() => console.log('Logger micro service is started!'));
