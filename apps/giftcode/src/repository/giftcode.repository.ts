import {EntityId, Repository, Schema} from 'redis-om';
import {createClient, RedisClientType} from "redis";
import {ConfigService} from "@nestjs/config";
import {
    GiftcodeClaimDto,
    GiftcodeGenerateDto,
    GiftcodeGetDto
} from "@common/microservice/providers/giftcode/giftcode.dto";

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
        for (let i = lastCategory; i < data.numberOfCategories + lastCategory - 1; i++)
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

    protected async searchGiftcode(data: GiftcodeGetDto): Promise<Giftcode[]> {
        let search = this.giftcodeRepository.search();

        if (data.category != undefined) search = search.where('category').eq(data.category);
        if (data.user != undefined) search = search.where('claimedBy').eq(data.user);

        // I have no idea why this is not working
        /*if (data.claimed != undefined) {
            if (Boolean(data.claimed) == true) {
                search = search.where('claimedBy').gte(0);
                console.log("Claimed is true");
            } else if (Boolean(data.claimed) == false) {
                search = search.where('claimedBy').eq(-1);
                console.log("Claimed is false");
            }
        }*/

        let retVal: Giftcode[] = [];
        (await search.return.all()).forEach(x => {// @ts-ignore
            if (x[EntityId] === data.code || !data.code)
                if (data.claimed == undefined || ((data['claimed'] as unknown === "true") == (x.claimedBy >= 0)))// @ts-ignore
                    retVal.push({...x, code: x[EntityId]} as Giftcode)
        })
        return retVal;
    }

    protected async claimGiftcode(data: GiftcodeClaimDto): Promise<Giftcode> | null {
        const availables = await this.giftcodeRepository.search().where('category').eq(data.category)
            .where('claimedBy').eq(-1).return.all()
        if (availables.length == 0) return null;

        const random = availables[Math.floor(Math.random() * availables.length)];
        random.claimedBy = data.user;

        await this.giftcodeRepository.save(random);// @ts-ignore
        return {...random, code: random[EntityId]} as Giftcode;
    }
}