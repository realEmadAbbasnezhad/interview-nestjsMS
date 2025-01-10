import {Inject, Injectable} from '@nestjs/common';
import {
    GiftcodeClaimDto,
    GiftcodeGetDto,
    GiftcodeGenerateDto, GiftcodeGetResponseDto
} from "@common/microservice/providers/giftcode/giftcode.dto";
import {GiftcodeRepository} from "@giftcode/repository/giftcode.repository";
import {ConfigService} from "@nestjs/config";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {LoggerDto as MicroServiceLoggerDto} from "@common/microservice/providers/logger/logger.dto";

@Injectable()
export class GiftcodeService extends GiftcodeRepository {
    public constructor(
        private readonly configService1: ConfigService,
        @Inject('LOGGER_SERVICE') private readonly loggerMicroService: ClientProxy
    ) {
        super(configService1);
    }

    async generate(data: GiftcodeGenerateDto): Promise<GiftcodeGetResponseDto> {
        let retVal: GiftcodeGetResponseDto = {};
        (await this.createMultipleGiftcode(data)).forEach(x => {
            retVal[x.category] = retVal[x.category] ?? {};
            retVal[x.category][x.code] = {claimedBy: x.claimedBy, prize: x.prize}
        });

        try {
            await lastValueFrom(this.loggerMicroService.send({cmd: "logger.log"}, {
                scope: 'giftcode',
                message: `generate giftcode: ${JSON.stringify(data)}`
            } as MicroServiceLoggerDto))
        } catch (e) {
        }

        return retVal
    }

    async get(data: GiftcodeGetDto): Promise<GiftcodeGetResponseDto> {
        let retVal: GiftcodeGetResponseDto = {};
        (await this.searchGiftcode(data)).forEach(x => {
            retVal[x.category] = retVal[x.category] ?? {};
            retVal[x.category][x.code] = {claimedBy: x.claimedBy, prize: x.prize}
        });

        return retVal
    }

    async claim(data: GiftcodeClaimDto): Promise<GiftcodeGetResponseDto> {
        let retVal = await this.claimGiftcode(data);

        // have no time to fix this. so just gonna left it like this!
        try {
            await lastValueFrom(this.loggerMicroService.send({cmd: "logger.log"}, {
                scope: 'giftcode',
                message: `claimed giftcode: ${JSON.stringify(retVal)}`
            } as MicroServiceLoggerDto))
        } catch (e) {
        }

        if (retVal == null) return {}
        return {...retVal}
    }
}