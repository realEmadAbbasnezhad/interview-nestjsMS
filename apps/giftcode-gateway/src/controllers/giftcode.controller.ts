import {Body, Controller, Get, Patch, Request, Post, Query} from "@nestjs/common";
import {GiftcodeClaimDto, GiftcodeGenerateDto, GiftcodeGetDto} from "@gateway/providers/giftcode/giftcode.dto";
import {GiftcodeService} from "@gateway/providers/giftcode/giftcode.service";
import {Admin} from "@gateway/modules/auth/providers/auth/auth.decorator";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";

@ApiBearerAuth("jwt")
@Controller('giftcode')
export class GiftcodeController {
    constructor(private readonly giftcodeService: GiftcodeService) {
    }

    @ApiOperation({description: "generate gift codes"})
    @Admin()
    @Post()
    async generate(@Body() body: GiftcodeGenerateDto) {
        return this.giftcodeService.generate(body);
    }

    @ApiOperation({description: "get gift codes with their categories and claimers"})
    @Admin()
    @Get()
    async get(@Query() body: GiftcodeGetDto) {
        return this.giftcodeService.get(body);
    }

    @ApiOperation({description: "get the categories with available codes"})
    @Get('categories')
    async listCategories() {
        return this.giftcodeService.listCategories();
    }

    @ApiOperation({description: "get gift codes that this user claimed"})
    @Patch('claim')
    async claim(@Query() body: GiftcodeClaimDto, @Request() req: any) {
        return this.giftcodeService.claim(body, req.jwt.sub);
    }

    @ApiOperation({description: "claim a new code"})
    @Get('claim')
    async getMyClaim(@Request() req: any) {
        return this.giftcodeService.get({user: req.jwt.sub} as GiftcodeGetDto);
    }
}