import { IsBoolean, IsOptional } from "class-validator";

export class UserSelectDto {
  @IsOptional()
  @IsBoolean()
  public uuid?: boolean | null;
  @IsOptional()
  @IsBoolean()
  public isBlocked?: boolean | null;

  constructor(uuid: boolean, isBlocked: boolean) {
    this.uuid = uuid;
    this.isBlocked = isBlocked;
  }
}