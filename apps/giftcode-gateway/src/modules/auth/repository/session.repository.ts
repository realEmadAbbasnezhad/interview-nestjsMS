import { Injectable } from '@nestjs/common';
import { Session, PrismaClient } from '@prisma/generated/auth';

@Injectable()
export abstract class SessionRepository {
    protected constructor(protected readonly prismaClient: PrismaClient) {}

    async createSession(data: Omit<Session, 'id'>): Promise<Session> {
        return this.prismaClient.session.create({ data });
    }

    async findSessionById(id: number): Promise<Session | null> {
        return this.prismaClient.session.findUnique({ where: { id } });
    }

    async findSessionsByUserId(userId: number): Promise<Session[]> {
        return this.prismaClient.session.findMany({ where: { userId } });
    }

    async updateSession(id: number, data: Partial<Session>): Promise<Session> {
        return this.prismaClient.session.update({ where: { id }, data });
    }

    async deleteSession(id: number): Promise<Session> {
        return this.prismaClient.session.delete({ where: { id } });
    }
}