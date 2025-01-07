import { Injectable } from '@nestjs/common';
import { User, PrismaClient } from '@prisma/generated/auth';

@Injectable()
export abstract class UserRepository {
    protected constructor(protected readonly prismaClient: PrismaClient) {}

    async createUser(data: Omit<User, 'id'>): Promise<User> {
        return this.prismaClient.user.create({ data });
    }

    async findUserById(id: number): Promise<User | null> {
        return this.prismaClient.user.findUnique({ where: { id } });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({ where: { username } });
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return this.prismaClient.user.update({ where: { id }, data });
    }

    async deleteUser(id: number): Promise<User> {
        return this.prismaClient.user.delete({ where: { id } });
    }
}