import {Controller, Get, Query} from '@nestjs/common';
import { LoggerService } from '@gateway/providers/log/log.service';
import { LoggerGetDto } from '@gateway/providers/log/log.dto';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {Admin} from "@gateway/modules/auth/providers/auth/auth.decorator";

@ApiBearerAuth("jwt")
@Controller('log')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  @Admin()
  @ApiOperation({ summary: 'Get logs' })
  async get(@Query() data: LoggerGetDto) {
    return this.loggerService.get(data);
  }
}