// OK!

import {BadRequestException, HttpException, Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {
    GiftcodeClaimDto,
    GiftcodeGenerateDto,
    GiftcodeGetCategoriesResponseDto,
    GiftcodeGetDto,
    GiftcodeGetResponseDto
} from "@gateway/providers/giftcode/giftcode.dto";
import {
    GiftcodeGetDto as MicroServiceGiftcodeGetDto,
    GiftcodeGenerateDto as MicroServiceGiftcodeGenerateDto,
    GiftcodeClaimDto as MicroServiceGiftcodeClaimDto
} from "@common/microservice/providers/giftcode/giftcode.dto"
import {lastValueFrom} from "rxjs";
import {ExceptionDto} from "@gateway/providers/exception/exception.dto";

@Injectable()
export class GiftcodeService {
    public constructor(@Inject('GIFTCODE_SERVICE') private readonly giftcodeMicroService: ClientProxy) {
    }

    public async generate(data: GiftcodeGenerateDto): Promise<GiftcodeGetResponseDto> {
        return await lastValueFrom(
            this.giftcodeMicroService.send({cmd: "giftcode.generate"}, data as MicroServiceGiftcodeGenerateDto))
    }

    public async get(data: GiftcodeGetDto): Promise<GiftcodeGetResponseDto> {
        return await lastValueFrom(
            this.giftcodeMicroService.send({cmd: "giftcode.get"}, data as MicroServiceGiftcodeGetDto))
    }

    public async claim(data: GiftcodeClaimDto, user: number): Promise<GiftcodeGetResponseDto> {
        const retVal = await lastValueFrom(
            this.giftcodeMicroService.send({cmd: "giftcode.claim"}, {
                ...data,
                user: user
            } as MicroServiceGiftcodeClaimDto));
        if (retVal[data.category] == undefined)
            throw new BadRequestException({message: "category is not exist"} as ExceptionDto)

        return retVal
    }

    public async listCategories(): Promise<GiftcodeGetCategoriesResponseDto> {
        const all = (await this.get({} as GiftcodeGetDto))

        let retVal: number[] = [];
        Object.keys(all).forEach((i) => retVal.push(parseInt(i)));

        return {categories: retVal} as GiftcodeGetCategoriesResponseDto
    }
}