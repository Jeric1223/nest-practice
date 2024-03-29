import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const serverConfing = config.get('server');

  const port = serverConfing.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
