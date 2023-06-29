import { Body, Controller, Get, HttpCode, Post, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "./service/token.service";
import { GenerateRefreshDto } from "./dto/generate-refresh.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("token")
export class TokenController {
  constructor(private config: ConfigService<{ port: number, private_key: string, public_key: string }>,
              private token: TokenService) {
  }

  @Post("generate/refresh")
  @HttpCode(200)
  GenerateRefresh(@Body(new ValidationPipe()) params: GenerateRefreshDto) {
    return this.token.GenerateRefresh(params);
  }

  @Post("generate/access")
  @HttpCode(200)
  GenerateAccess(@Body(new ValidationPipe()) params: RefreshTokenDto) {
    return this.token.GenerateAccess(params);
  }

  @Post("is-valid/refresh")
  @HttpCode(200)
  CheckRefresh(@Body(new ValidationPipe()) params: RefreshTokenDto) {
    return this.token.CheckRefresh(params);
  }

  @Get("public-key")
  @HttpCode(200)
  async GetAccessPublicKey() {
    return this.config.get<string>("public_key");
  }
}