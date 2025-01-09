// OK!

import {Controller, Post, Body, UseGuards} from '@nestjs/common';
import { Anonymous} from "../providers/auth/auth.decorator";
import {AuthService} from "@gateway/modules/auth/providers/auth/auth.service";
import { SigninDto, SignupDto} from "@gateway/modules/auth/providers/auth/auth.dto";
import {ApiOperation} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Anonymous()
    @ApiOperation({summary: 'create your account hare!'})
    @Post('signup')
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body);
    }

    @Anonymous()
    @ApiOperation({summary: 'login to your account'})
    @Post('signin')
    async signin(@Body() body: SigninDto) {
        return this.authService.signin(body);
    }
}