import { IsHexadecimal, IsString, IsUUID, Length } from "class-validator";

export class RegisterDto {
  @IsHexadecimal()
  @Length(64, 64)
  public fingerprint: string;
  @IsString()
  @Length(0, 100)
  public name: string;
  @IsUUID(4)
  public userUuid: string;

  constructor(fingerprint: string, name: string, userUuid: string) {
    this.fingerprint = fingerprint;
    this.name = name;
    this.userUuid = userUuid;
  }
}