import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mobile Dev')
    .setDescription('The mobile API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api-docs',
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
