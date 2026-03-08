import { join } from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use('/streams', express.static(join(process.cwd(), 'streams')));

  app.useGlobalPipes(new ValidationPipe());

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
