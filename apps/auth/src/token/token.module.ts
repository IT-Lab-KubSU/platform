import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenService } from "./service/token.service";
import { UserModule } from "../user/user.module";
import { DeviceModule } from "../device/device.module";

@Module({
  imports: [
    UserModule,
    DeviceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<{ port: number, private_key: string, public_key: string }>) => ({
        publicKey: configService.get<string>("public_key"),
        privateKey: configService.get<string>("private_key"),
        signOptions: { algorithm: "RS512", issuer: "sc-user-authentication" }
      })
    })],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {
}
