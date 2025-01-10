import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {GiftcodeService} from '@giftcode/providers/giftcode/giftcode.service';
import {
    GiftcodeClaimDto,
    GiftcodeGetDto,
    GiftcodeGenerateDto
} from "@common/microservice/providers/giftcode/giftcode.dto";

@Controller()
export class GiftcodeController {
    constructor(private readonly giftcodeService: GiftcodeService) {
    }

    @MessagePattern({cmd: 'giftcode.generate'})
    async generate(@Payload() body: GiftcodeGenerateDto) {
        return this.giftcodeService.generate(body);
    }

    @MessagePattern({cmd: 'giftcode.get'})
    async get(@Payload() body: GiftcodeGetDto) {
        return this.giftcodeService.get(body);
    }

    @MessagePattern({cmd: 'giftcode.claim'})
    async claim(@Payload() body: GiftcodeClaimDto) {
        return this.giftcodeService.claim(body);
    }
}