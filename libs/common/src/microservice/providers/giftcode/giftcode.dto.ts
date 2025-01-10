import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min} from "class-validator";

export class GiftcodeGenerateDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    numberOfCategories: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    numberOfCodes: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    prizeMin: number

    @IsNumber()
    @IsNotEmpty()
    prizeMax: number
}

export class GiftcodeGetDto {
    @IsNumber()
    @IsOptional()
    category: number

    @IsNumber()
    @IsOptional()
    user: number

    @IsNumber()
    @IsOptional()
    code: string

    @IsBoolean()
    @IsOptional()
    claimed: boolean
}

export class GiftcodeClaimDto {
    @IsNumber()
    @IsNotEmpty()
    category: number
}

export class GiftcodeGetResponseDto {
    [category: number]: { [code: string]: { claimedBy: number | null, prize: number } }
}