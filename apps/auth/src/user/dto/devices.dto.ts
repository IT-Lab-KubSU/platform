import { IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DeviceSelectDto } from "./elements/device-select.dto";

export class DevicesDto {
  @IsUUID(4)
  public uuid: string;
  @IsOptional()
  @ValidateNested({ each: false })
  @Type(() => DeviceSelectDto)
  public select?: DeviceSelectDto | null;

  constructor(uuid: string, select: DeviceSelectDto) {
    this.uuid = uuid;
    this.select = select;
  }
}