import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {Admin} from "../providers/auth/auth.decorator";

@Controller('user')
export class UserController {
    @Get('details')
    @Admin()
    async getUserDetails(@Req() req: any) {
        // Return user details logic here
    }
}