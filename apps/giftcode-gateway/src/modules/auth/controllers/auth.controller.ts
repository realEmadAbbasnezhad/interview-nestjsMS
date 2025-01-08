import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('signin')
    async signIn(@Body() signInDto: any) {
        // Sign-in logic here
    }

    @Post('logout')
    async logout(@Body() logoutDto: any) {
        // Logout logic here
    }
}