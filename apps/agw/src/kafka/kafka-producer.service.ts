import { Injectable } from '@nestjs/common';
import {KafkaPayload, KafkaService} from 'nestjs-kafka';

@Injectable()
export class KafkaProducerService {
  TASK_PUSH_INFO = "agw";
  constructor(private readonly kafkaService: KafkaService) {}

  async sendLogMessage(topic: string, message: string): Promise<void> {
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: this.TASK_PUSH_INFO,
      topicName: this.TASK_PUSH_INFO,
    };
    this.kafkaService.sendMessage('log-kafka', payload);
  }
}
