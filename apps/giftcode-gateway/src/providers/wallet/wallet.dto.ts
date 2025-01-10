import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString} from "class-validator";

export class WalletGetDto {
    @ApiProperty({description: "user that you want information about"})
    @IsNumberString()
    @IsNotEmpty()
    user: number
}
export class WalletGetResponseDto {
    balance: number
    transactions: { [date: string]: { amount: number } }
}