import { Module } from '@nestjs/common';
import { KafkaModule } from 'nestjs-kafka';
import {KafkaProducerService} from "./kafka-producer.service";

@Module({
  imports: [
    KafkaModule.register({
      groupId: "",
      clientId: 'nestjs-app',
      brokers: ['localhost:9092']
    }),
  ],
  exports: [KafkaModule],
  providers: [KafkaProducerService],
})
export class KafkaConfigModule {}
