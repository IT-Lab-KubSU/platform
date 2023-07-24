import { IsHexadecimal, Length } from "class-validator";

export class FingerprintDto {
  @IsHexadecimal()
  @Length(64, 64)
  public fingerprint: string;

  constructor(fingerprint: string) {
    this.fingerprint = fingerprint;
  }
}