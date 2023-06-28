import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { KafkaProducerService } from './kafka-producer.service';

@Injectable()
export class KafkaLoggerMiddleware implements NestMiddleware {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `Request: ${req.method} ${req.url}`;
    await this.kafkaProducer.sendLogMessage('request-logs', logMessage);
    next();
  }
}
