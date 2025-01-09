import {ConflictException, Injectable} from '@nestjs/common';
import {UserRepository} from '@gateway/repository/user.repository';
import {HashService} from '@common/encrypt/providers/hash.service';
import {AuthResponseDto, SignupDto} from "@gateway/modules/auth/providers/auth/auth.dto";
import {User} from "@prisma/generated/auth";

@Injectable()
export class AuthService extends UserRepository {
    constructor(private readonly hashService: HashService) {
        super();
    }

    async signup(data: SignupDto): Promise<AuthResponseDto> {
        const passwordHash = await this.hashService.hash(data.password);
        let newUser: User = undefined;
        try {
            newUser = await this.createUser({
                username: data.username, password_hash: passwordHash
            } as User);
        } catch (err) {
            if (err.code === 'P2002') {
                throw new ConflictException('Username already exists');
            }
            console.log(err);
        }

        return {token: ""} as AuthResponseDto;
    }

    /*async login(username: string, password: string): Promise<User | null> {
        const user = await this.getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            return user;
        }
        return null;
    }

    private async getUserByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({where: {username}});
    }*/
}