import {PrismaClient, User} from '@prisma/generated/auth';

export abstract class UserRepository {
    private prisma: PrismaClient;

    protected constructor() {
        this.prisma = new PrismaClient();
    }

    protected async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<User> {
        user.deletedAt = null;
        return this.prisma.user.create({data: user});
    }

    protected async getUser(id: number): Promise<User> {
        return this.prisma.user.findUnique({where: {id}});
    }
}