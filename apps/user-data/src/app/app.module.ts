import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { UserModule } from "../user/user.module";
import { EmailModule } from "../email/email.module";
import { PhoneNumberModule } from "../phone-number/phone-number.module";

@Module({
  imports: [UserModule, EmailModule, PhoneNumberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
