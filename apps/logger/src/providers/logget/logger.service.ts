import {Injectable} from '@nestjs/common';
import {InjectModel, Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';
import {LoggerDto, LoggerGetDto, LoggerGetResultDto} from "@common/microservice/providers/logger/logger.dto";

@Schema()
export class Log extends Document {
    @Prop({required: true})
    message: string;

    @Prop({required: true})
    scope: string;

    @Prop({default: Date.now})
    timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);

@Injectable()
export class LoggerService {
    constructor(@InjectModel(Log.name) private logModel: Model<Log>) {
    }

    async log(data: LoggerDto): Promise<void> {

        console.log(data);

        const newLog = new this.logModel({
            message: data.message,
            scope: data.scope,
            timestamp: new Date(),
        });
        await newLog.save();
    }

    async get(data: LoggerGetDto): Promise<LoggerGetResultDto> {

        let filter = {};
        if (data.scope) filter['scope'] = data.scope;
        if (data.time_min != undefined) {
            filter['timestamp'] = {}
            filter['timestamp']['$gte'] = new Date(data.time_min)
        }
        if (data.time_max != undefined) {
            if (filter['timestamp'] == undefined) filter['timestamp'] = {}
            filter['timestamp']['$lte'] = new Date(data.time_max)
        }
        console.log(filter)

        const logs = await this.logModel.find(filter).exec();

        return {
            messages: logs.map(log => ({
                message: log.message,
                scope: log.scope,
                timestamp: log.timestamp.toISOString(),
            })),
        };
    }
}