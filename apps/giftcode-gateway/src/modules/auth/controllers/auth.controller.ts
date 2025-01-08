import {Controller, Post, Body, UseGuards} from '@nestjs/common';
import {Anonymous} from "../providers/auth/auth.decorator";

@Controller('auth')
export class AuthController {
    @Anonymous()
    @Post('signin')
    async signIn(@Body() signInDto: any) {
        return {};
    }

    @Post('logout')
    async logout(@Body() logoutDto: any) {
        // Logout logic here
    }
}