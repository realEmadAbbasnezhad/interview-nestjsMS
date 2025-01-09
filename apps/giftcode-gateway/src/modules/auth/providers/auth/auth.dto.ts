import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, MinLength, Matches} from 'class-validator';

export class JwtPayloadDto{
    admin: boolean;
}

export class SignupDto{
    @ApiProperty({description: "username of user, must be unique", example: "user0"})
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username can only contain letters and numbers' })
    username: string;

    @ApiProperty({description: "a strong password for your user", example: "password"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class AuthResponseDto {
    @ApiProperty({description: "JWT token for user"})
    token: string;
}
