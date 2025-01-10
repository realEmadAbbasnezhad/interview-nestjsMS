// OK!

import {IsBooleanString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GiftcodeGenerateDto {
    @ApiProperty({description: "Number of categories"})
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    numberOfCategories: number;

    @ApiProperty({description: "Number of codes per category"})
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    numberOfCodes: number;

    @ApiProperty({description: "Minimum prize value"})
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    prizeMin: number

    @ApiProperty({description: "Maximum prize value"})
    @IsNumber()
    @IsNotEmpty()
    prizeMax: number
}

export class GiftcodeGetDto {
    @ApiProperty({description: "category you want to filter", required: false})
    @IsNumberString()
    @IsOptional()
    category: number | undefined

    @ApiProperty({description: "claims happened by this user", required: false})
    @IsNumberString()
    @IsOptional()
    user: number | undefined

    @ApiProperty({description: "get info about this code", required: false})
    @IsString()
    @IsOptional()
    code: string | undefined

    @ApiProperty({description: "return those only claimed or not", required: false})
    @IsBooleanString()
    @IsOptional()
    claimed: boolean | undefined
}

export class GiftcodeClaimDto {
    @ApiProperty({description: "category you want to claim from", required: false})
    @IsNumberString()
    @IsNotEmpty()
    category: number
}

export class GiftcodeGetCategoriesResponseDto {
    categories: number[]
}

export class GiftcodeGetResponseDto {
    [category: number]: { [code: string]: { claimedBy: number | null, prize: number } }
}