import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

export async function setupSwagger(app: INestApplication, config: ConfigService) {
    const documentBuilder = new DocumentBuilder()
        .setTitle('Giftcode Gateway API')
        .setDescription('API documentation for the Giftcode Gateway')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('swagger', app, document);
    console.log('Swagger is started and listening on "/swagger"!');
}
