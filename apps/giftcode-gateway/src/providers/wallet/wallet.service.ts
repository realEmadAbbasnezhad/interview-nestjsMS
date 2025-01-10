import {Injectable, NotFoundException} from "@nestjs/common";
import {WalletRepository} from "@gateway/repository/wallet.repository";
import {WalletGetDto, WalletGetResponseDto} from "@gateway/providers/wallet/wallet.dto";
import {ExceptionDto} from "@gateway/providers/exception/exception.dto";

@Injectable()
export class WalletService extends WalletRepository {
    public constructor() {
        super();
    }

    public async newTransaction(amount: number, user: number): Promise<void> {
        await this.createTransaction({amount}, {id: user});
    }

    public async getTransactions(data: WalletGetDto): Promise<WalletGetResponseDto> {
        const wallet = await this.getWalletByUser({id: data.user});
        if (!wallet) throw new NotFoundException({message: 'User not found'} as ExceptionDto);

        let retVal: WalletGetResponseDto = {balance: wallet.balance, transactions: {}};
        wallet.transactions.forEach(x => {
            retVal.transactions[x.createdAt.toISOString()] = {amount: x.amount};
        });
        return retVal
    }
}