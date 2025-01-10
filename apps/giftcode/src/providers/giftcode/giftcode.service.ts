import {Injectable} from '@nestjs/common';
import {
    GiftcodeClaimDto,
    GiftcodeGetDto,
    GiftcodeGenerateDto, GiftcodeGetResponseDto
} from "@common/microservice/providers/giftcode/giftcode.dto";
import {GiftcodeRepository} from "@giftcode/repository/giftcode.repository";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class GiftcodeService extends GiftcodeRepository {
    public constructor(
        private readonly configService1: ConfigService,
    ) {
        super(configService1);
    }

    async generate(data: GiftcodeGenerateDto): Promise<GiftcodeGetResponseDto> {
        let retVal: GiftcodeGetResponseDto = {};
        (await this.createMultipleGiftcode(data)).forEach(x => {
            retVal[x.category] = retVal[x.category] ?? {};
            retVal[x.category][x.code] = {claimedBy: x.claimedBy, prize: x.prize}
        });

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

        if (retVal == null) return {}
        return {...retVal}
    }
}