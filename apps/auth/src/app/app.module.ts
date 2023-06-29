import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import PortConfig from "../config/port.config";
import KeysConfig from "../config/keys.config";
import { UserModule } from "../user/user.module";
import { DeviceModule } from "../device/device.module";
import { TokenModule } from "../token/token.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [PortConfig, KeysConfig] }),
    UserModule,
    DeviceModule,
    TokenModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
