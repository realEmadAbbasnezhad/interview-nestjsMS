import {
    CanActivate,
    ExecutionContext, ForbiddenException,
    Injectable, SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from '@nestjs/core';
import {IS_ADMIN_KEY, IS_ANONYMOUS_KEY} from "./auth.decorator";
import {JwtPayloadDto} from "./auth.dto";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // if action is annotated with @Anonymous, skip authentication
        if (this.reflector.getAllAndOverride<boolean>(IS_ANONYMOUS_KEY,
            [context.getHandler(), context.getClass()])) return true;

        // check if token is present in headers
        const request = context.switchToHttp().getRequest();
        const [tokenType, token] = request.headers.authorization?.split(' ') ?? [];
        if (tokenType !== 'Bearer') {
            throw new UnauthorizedException();
        }

        // verify token
        try {
            // also attaching payload to request object
            request.jwt = await this.jwtService.verifyAsync(token, {}) as JwtPayloadDto;
        } catch {
            throw new UnauthorizedException();
        }

        // if action is annotated with @Admin, check if user is admin
        if (this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY,
            [context.getHandler(), context.getClass()]))
            if (!request.jwt.admin) throw new ForbiddenException();

        // if everything is fine, allow access
        return true;
    }
}
