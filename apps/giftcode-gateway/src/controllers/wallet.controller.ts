import {Controller, Get, Query, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {Admin} from "@gateway/modules/auth/providers/auth/auth.decorator";
import {WalletGetDto} from "@gateway/providers/wallet/wallet.dto";
import {WalletService} from "@gateway/providers/wallet/wallet.service";

@ApiBearerAuth("jwt")
@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {
    }

    @ApiOperation({description: "get all information's about this wallet"})
    @Admin()
    @Get()
    async get(@Query() query: WalletGetDto) {
        return this.walletService.getTransactions(query);
    }

    @ApiOperation({description: "get this user wallet"})
    @Get('my')
    async getBalance(@Request() req: any) {
        return this.walletService.getTransactions({user: req.jwt.sub});
    }
}