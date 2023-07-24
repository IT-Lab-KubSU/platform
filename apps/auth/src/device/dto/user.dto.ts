import { IsHexadecimal, IsOptional, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserSelectDto } from "./elements/user-select.dto";

export class UserDto {
  @IsHexadecimal()
  @Length(64, 64)
  public fingerprint: string;
  @IsOptional()
  @ValidateNested({ each: false })
  @Type(() => UserSelectDto)
  public select?: UserSelectDto | null;

  constructor(fingerprint: string, select?: UserSelectDto | null) {
    this.fingerprint = fingerprint;
    this.select = select;
  }
}
