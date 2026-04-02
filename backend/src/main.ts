import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   bodyParser: false,
  // }); this is the main reason for the 500 error the body is not being parsed because manually selected the bodyParser to false above

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(process.cwd(), 'streams'), {
    prefix: '/streams',
  });

  const config = new DocumentBuilder()
    .setTitle('Video Streaming API')
    .setDescription('API documentation for the video streaming platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
