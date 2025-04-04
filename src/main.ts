import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const envPathFile = resolve(__dirname,'config','.env');
  AppConfig.loadEnvironmentVariable(envPathFile);
  const app = await NestFactory.create(AppModule);


  app.enableCors();
  app.enableCors({
    origin: true,
    allowedHeaders: ['Custom-Header', 'Content-Type', 'Authorization'],
    exposedHeaders: ['Custom-Header'],
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
