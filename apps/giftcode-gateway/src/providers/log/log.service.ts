import {Inject, Injectable} from '@nestjs/common';
import {LoggerGetDto} from './log.dto';
import {LoggerDto} from "@common/microservice/providers/logger/logger.dto";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {
    LoggerGetDto as MicroServiceLoggerGetDto,
    LoggerDto as MicroServiceLoggerDto,
    LoggerGetResultDto as MicroServiceLoggerGetResultDto
} from "@common/microservice/providers/logger/logger.dto";

@Injectable()
export class LoggerService {
    constructor(@Inject('LOGGER_SERVICE') private readonly loggerMicroService: ClientProxy) {
    }

    async get(data: LoggerGetDto): Promise<MicroServiceLoggerGetResultDto> {
        return await lastValueFrom(
            this.loggerMicroService.send({cmd: "logger.get"}, data as MicroServiceLoggerGetDto))
    }

    async log(data: LoggerDto): Promise<void> {
        return await lastValueFrom(
            this.loggerMicroService.send({cmd: "logger.log"}, data as MicroServiceLoggerDto))
    }
}