// OK!

import {ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from '@gateway/repository/user.repository';
import {HashService} from '@common/encrypt/providers/hash.service';
import {AuthResponseDto, JwtPayloadDto, SigninDto, SignupDto} from "@gateway/modules/auth/providers/auth/auth.dto";
import {User} from "@prisma/generated/auth";
import {ExceptionDto} from "@gateway/providers/exception/exception.dto";
import {JwtService} from '@nestjs/jwt';
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {LoggerDto as MicroServiceLoggerDto} from "@common/microservice/providers/logger/logger.dto";

@Injectable()
export class AuthService extends UserRepository {
    public constructor(
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    @Inject('LOGGER_SERVICE') private readonly loggerMicroService: ClientProxy) {
        super();
    }

    public async signup(data: SignupDto): Promise<AuthResponseDto> {
        const passwordHash = await this.hashService.hash(data.password);
        let newUser: User = undefined;
        try {
            newUser = await this.createUser({
                username: data.username, password_hash: passwordHash, isAdmin: false
            } as User);
        } catch (err) {
            if (err.code === 'P2002') {
                throw new ConflictException({message: 'Username already exists'} as ExceptionDto);
            }
            throw err;
        }

        const payload = {username: newUser.username, sub: newUser.id, admin: newUser.isAdmin} as JwtPayloadDto;

        try {
            await lastValueFrom(this.loggerMicroService.send({cmd: "logger.log"}, {
                scope: 'auth',
                message: `user signup: ${JSON.stringify(payload)}`
            } as MicroServiceLoggerDto))
        } catch (e) {
        }

        return {token: this.jwtService.sign(payload), user: payload} as AuthResponseDto;
    }

    public async signin(data: SigninDto): Promise<AuthResponseDto> {
        let user: User = undefined;
        try {
            user = await this.getUserByUsername({username: data.username});
        } catch (err) {
            throw err;
        }

        if (!user) throw new NotFoundException({message: 'Username not founded'} as ExceptionDto);
        if (!await this.hashService.verify(data.password, user.password_hash))
            throw new UnauthorizedException({message: 'Password is wrong'} as ExceptionDto);

        const payload = {username: user.username, sub: user.id, admin: user.isAdmin} as JwtPayloadDto;

        try {
            await lastValueFrom(this.loggerMicroService.send({cmd: "logger.log"}, {
                scope: 'auth',
                message: `user login: ${JSON.stringify(payload)}`
            } as MicroServiceLoggerDto))
        } catch (e) {
        }

        return {token: await this.jwtService.signAsync(payload), user: payload} as AuthResponseDto;
    }
}