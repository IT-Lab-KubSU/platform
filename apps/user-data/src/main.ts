/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {USER_DATA_SERVICE_PORT} from "@pconfig";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = USER_DATA_SERVICE_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 User Data Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();