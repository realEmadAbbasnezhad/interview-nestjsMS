import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const [tokenType, token] = request.headers.authorization?.split(' ') ?? [];
        if (tokenType !== 'Bearer') {
            throw new UnauthorizedException();
        }
        try {
            // also attaching user to request object
            request.user = await this.jwtService.verifyAsync(token, {

            });
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}
