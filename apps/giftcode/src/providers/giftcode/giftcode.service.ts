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
        return {
            1: {
                "ABC123": {claimedBy: 123, prize: 50},
                "XYZ789": {claimedBy: null, prize: 75}
            },
            2: {
                "LMN456": {claimedBy: 456, prize: 20}
            }
        };
    }

    async claim(data: GiftcodeClaimDto): Promise<GiftcodeGetResponseDto> {
        return {
            1: {
                "ABC123": {claimedBy: 123, prize: 50}
            }
        };
    }
}