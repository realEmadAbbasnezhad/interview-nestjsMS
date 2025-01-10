import {Injectable} from '@nestjs/common';
import {
    GiftcodeClaimDto,
    GiftcodeGetDto,
    GiftcodeGenerateDto, GiftcodeGetResponseDto
} from "@common/microservice/providers/giftcode/giftcode.dto";

@Injectable()
export class GiftcodeService {
    async generate(data: GiftcodeGenerateDto): Promise<GiftcodeGetResponseDto> {
        return {
            1: {
                "ABC123": {claimedBy: null, prize: 50},
                "XYZ789": {claimedBy: null, prize: 75}
            },
            2: {
                "LMN456": {claimedBy: null, prize: 20}
            }
        };
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