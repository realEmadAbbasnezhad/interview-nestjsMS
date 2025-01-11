import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from '@nestjs/microservices';
import {LoggerDto, LoggerGetDto} from "@common/microservice/providers/logger/logger.dto";
import {LoggerService} from "@logger/providers/logget/logger.service";

@Controller()
export class LoggerController {
    constructor(private readonly loggerService: LoggerService) {
    }

    @MessagePattern({cmd: 'logger.get'})
    async get(@Payload() data: LoggerGetDto) {
       return  await this.loggerService.get(data);
    }

    @MessagePattern({cmd: 'logger.log'})
    async log(@Payload() data: LoggerDto, @Ctx() context: RmqContext) {
        return  await this.loggerService.log(data);
    }
}