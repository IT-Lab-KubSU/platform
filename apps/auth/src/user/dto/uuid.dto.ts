import { IsUUID } from "class-validator";

export class UuidDto {
  @IsUUID(4)
  public uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}