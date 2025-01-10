// OK!

import {PrismaClient, Transaction, User, Wallet} from '@prisma/generated/auth';

export abstract class WalletRepository {
    private prisma: PrismaClient;

    protected constructor() {
        this.prisma = new PrismaClient();
    }

    protected async createTransaction(
        transaction: Pick<Transaction, 'amount'>, user: Pick<User, 'id'>): Promise<Transaction> {
        await this.prisma.wallet.update({
            data: {balance: (await this.prisma.wallet.findUnique({where: {id: user.id}})).balance + transaction.amount},
            where: {id: user.id}
        });
        return this.prisma.transaction.create({data: {...transaction, wallet_id: user.id}});
    }

    protected async getWalletByUser(user: Pick<User, 'id'>) {
        return (await this.prisma.wallet.findUnique({
            where: {id: user.id},
            include: {transactions: true}
        }));
    }
}