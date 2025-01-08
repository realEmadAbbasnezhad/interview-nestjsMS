import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('details')
    async getUserDetails(@Req() req: any) {
        // Return user details logic here
    }
}