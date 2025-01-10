import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export async function setupMicroservice(app: INestApplication, config: ConfigService) {
    app.get('GIFTCODE_SERVICE').connect();
}
