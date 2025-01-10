import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min} from "class-validator";
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
    @ApiProperty({description: "category you want to filter"})
    @IsNumber()
    @IsOptional()
    category: number

    @ApiProperty({description: "claims happened by this user"})
    @IsNumber()
    @IsOptional()
    user: number

    @ApiProperty({description: "get info about this code"})
    @IsNumber()
    @IsOptional()
    code: string

    @ApiProperty({description: "return those only claimed or not"})
    @IsBoolean()
    @IsOptional()
    claimed: boolean
}

export class GiftcodeClaimDto {
    @ApiProperty({description: "category you want to claim from"})
    @IsNumber()
    @IsNotEmpty()
    category: number
}

export class GiftcodeGetCategoriesResponseDto {
    categories: number[]
}

export class GiftcodeGetResponseDto {
    [category: number]: { [code: string]: { claimedBy: number | null, prize: number } }
}