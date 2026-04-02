"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'streams'), {
        prefix: '/streams',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Video Streaming API')
        .setDescription('API documentation for the video streaming platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map