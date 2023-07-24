import { IsHexadecimal, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class GenerateRefreshDto {
  @IsUUID(4)
  public user_uuid: string;
  @IsHexadecimal()
  @Length(64, 64)
  public device_fingerprint: string;
  @IsOptional()
  @IsString()
  @Length(0, 100)
  public device_name?: string | null;

  constructor(user_uuid: string, device_fingerprint: string, device_name?: string) {
    this.user_uuid = user_uuid;
    this.device_fingerprint = device_fingerprint;
    this.device_name = device_name;
  }
}