import {EntityId, Repository, Schema} from 'redis-om';
import {createClient, RedisClientType} from "redis";
import {ConfigService} from "@nestjs/config";
import {GiftcodeGenerateDto} from "@common/microservice/providers/giftcode/giftcode.dto";

const giftcodeSchema = new Schema('giftcode', {
    category: {type: 'number', sortable: true},
    claimedBy: {type: 'number'},
    prize: {type: 'number'}
});

class Giftcode {
    code: string;
    category: number;
    claimedBy: number;
    prize: number;
}

export abstract class GiftcodeRepository {
    protected client: RedisClientType;
    protected giftcodeRepository: Repository;

    protected constructor(
        private readonly configService: ConfigService,
    ) {
        this.client = createClient({url: configService.get<string>("REDIS_URL")})
        this.client.connect().then(x => console.log("Connected to Redis"));

        this.giftcodeRepository = new Repository(giftcodeSchema, this.client);
        this.giftcodeRepository.createIndex().then(r => {
        });
    }

    protected async createMultipleGiftcode(data: GiftcodeGenerateDto): Promise<Giftcode[]> {
        const lastCategorySearch = await this.giftcodeRepository.search()
            .sortDescending('category')
            .return.first()
        const lastCategory: number = lastCategorySearch ? lastCategorySearch.category : 0;

        const retVal: Giftcode[] = [];
        for (let i = lastCategory; i < data.numberOfCategories + lastCategory; i++)
            for (let j = 0; j < data.numberOfCodes; j++) {
                const giftcode = {
                    claimedBy: -1, category: i,
                    prize: Math.floor(Math.random() * (data.prizeMax - data.prizeMin + 1)) + data.prizeMin
                } as Omit<Giftcode, "code">;

                const saveResult = await this.giftcodeRepository.save(giftcode)// @ts-ignore
                retVal.push({...saveResult, code: saveResult[EntityId]} as Giftcode);
            }

        return retVal;
    }
}