import { IsString } from "class-validator";

export class RefreshTokenDto {
  @IsString()
  public refresh_token: string;

  constructor(refresh_token: string) {
    this.refresh_token = refresh_token;
  }
}