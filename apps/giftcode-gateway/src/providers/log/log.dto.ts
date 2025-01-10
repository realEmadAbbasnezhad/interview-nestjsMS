import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsOptional} from 'class-validator';

export class LoggerGetDto {
    @ApiProperty({description: 'Maximum time', required: false})
    @IsString()
    @IsOptional()
    time_max: string | undefined;

    @ApiProperty({description: 'Minimum time', required: false})
    @IsString()
    @IsOptional()
    time_min: string | undefined;

    @ApiProperty({description: 'Scope of the logs', required: false})
    @IsString()
    @IsOptional()
    scope: string | undefined;
}
