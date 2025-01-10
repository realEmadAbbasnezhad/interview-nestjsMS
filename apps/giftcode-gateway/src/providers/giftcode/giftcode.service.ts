import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {
    GiftcodeClaimDto,
    GiftcodeGenerateDto, GiftcodeGetCategoriesResponseDto,
    GiftcodeGetDto,
    GiftcodeGetResponseDto
} from "@gateway/providers/giftcode/giftcode.dto";

@Injectable()
export class GiftcodeService {
    public constructor(@Inject('GIFTCODE_SERVICE') private readonly giftcodeService: ClientProxy) {
    }

    public async generate(data: GiftcodeGenerateDto): Promise<GiftcodeGetResponseDto> {
        return {1: {"QWERTY": {claimedBy: 12, prize: 2}}} as GiftcodeGetResponseDto
    }

    public async get(data: GiftcodeGetDto): Promise<GiftcodeGetResponseDto> {
        return {
            1: {"QWERTY": {claimedBy: 12, prize: 2}},
            2: {"QWERTY": {claimedBy: 12, prize: 2}},
            3: {"QWERTY": {claimedBy: 12, prize: 2}},
            4: {"QWERTY": {claimedBy: 12, prize: 2}}
        } as GiftcodeGetResponseDto
    }

    public async listCategories(): Promise<GiftcodeGetCategoriesResponseDto> {
        const all = (await this.get({} as GiftcodeGetDto))

        let retVal: number[] = [];
        Object.keys(all).forEach((i) => retVal.push(parseInt(i)));

        return {categories: retVal} as GiftcodeGetCategoriesResponseDto
    }

    public async claim(data: GiftcodeClaimDto, user: number): Promise<GiftcodeGetResponseDto> {
        return {1: {"QWERTY": {claimedBy: 12, prize: 2}}} as GiftcodeGetResponseDto
    }
}