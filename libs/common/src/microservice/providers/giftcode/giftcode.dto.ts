import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";

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
    category: number | undefined

    @IsNumber()
    @IsOptional()
    user: number | undefined

    @IsString()
    @IsOptional()
    code: string | undefined

    @IsBoolean()
    @IsOptional()
    claimed: boolean | undefined
}

export class GiftcodeClaimDto {
    @IsNumber()
    @IsNotEmpty()
    category: number

    @IsNumber()
    @IsNotEmpty()
    user: number
}

export class GiftcodeGetResponseDto {
    [category: number]: { [code: string]: { claimedBy: number | null, prize: number } }
}