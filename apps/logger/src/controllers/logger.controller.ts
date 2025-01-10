import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {LoggerDto, LoggerGetDto} from "@common/microservice/providers/logger/logger.dto";

@Controller()
export class LoggerController {
    @MessagePattern({cmd: 'logger.get'})
    async get(data: LoggerGetDto) {
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
    async log(data: LoggerDto) {
        console.log(data);
    }
}