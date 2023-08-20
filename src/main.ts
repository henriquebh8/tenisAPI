import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';


export async function bootstrap(port) {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
 // app.use(AuthenticationMiddleware);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
});

  const config = new DocumentBuilder()
    .setTitle('Tenis API')
    .setDescription('Tenis application backend routes')
    .setVersion('1.0')
    .addTag('Tenis API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
//bootstrap(3001);
