import {Module} from '@nestjs/common';
import {ConfigModule} from "@common/config/config.module";
import {GiftcodeController} from "@giftcode/controller/giftcode.controller";
import {GiftcodeService} from "@giftcode/providers/giftcode/giftcode.service";

@Module({
    imports: [ConfigModule],
    controllers: [GiftcodeController],
    providers: [GiftcodeService]
})
export class GiftcodeModule {
}
