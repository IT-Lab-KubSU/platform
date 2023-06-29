import { IsBoolean, IsOptional } from "class-validator";

export class DeviceSelectDto {
  @IsOptional()
  @IsBoolean()
  public name?: boolean | null;
  @IsOptional()
  @IsBoolean()
  public fingerprint?: boolean | null;
  @IsOptional()
  @IsBoolean()
  public isBlocked?: boolean | null;

  constructor(name: boolean, fingerprint: boolean, isBlocked: boolean) {
    this.name = name;
    this.fingerprint = fingerprint;
    this.isBlocked = isBlocked;
  }
}