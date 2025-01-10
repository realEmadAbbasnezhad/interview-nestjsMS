import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from '@nestjs/microservices';
import {LoggerDto, LoggerGetDto} from "@common/microservice/providers/logger/logger.dto";

@Controller()
export class LoggerController {
    @MessagePattern({cmd: 'logger.get'})
    async get(@Payload()data: LoggerGetDto, @Ctx() context: RmqContext) {


        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        channel.ack(originalMsg);

        return {
            messages: [
                {
                    message: 'Hello',
                    scope: 'world',
                    timestamp: new Date().toISOString()
                }
            ]
        }
    }

    @MessagePattern({cmd: 'logger.log'})
    async log(@Payload()data: LoggerDto, @Ctx() context: RmqContext) {
        console.log(data);
    }
}