import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export async function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Giftcode Gateway API')
        .setDescription('API documentation for the Giftcode Gateway')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    console.log('Swagger is started and listening on "/swagger"!');
}
