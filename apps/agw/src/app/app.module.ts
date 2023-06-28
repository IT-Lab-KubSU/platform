import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ApiGatewayModule} from "../api-gateway/api-gateway.module";
import {KafkaConfigModule} from "../kafka/kafka.module";

@Module({
  imports: [ApiGatewayModule, KafkaConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
