import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { AuthClient } from "@platform/prisma-clients";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: AuthClient) {
  }

  public getUserUuidAsPrismaPromise(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    return this.prisma.userDevice.findUnique({ where: { fingerprint }, select: { userUuid: true } });
  }

  public async User(params: UserDto) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    let select: { uuid?: boolean, isBlocked?: boolean } | undefined = { uuid: true, isBlocked: true };
    if (params.select !== undefined && params.select !== null) {
      select = {};
      if (params.select.uuid !== undefined && params.select.uuid !== null) select.uuid = params.select.uuid;
      if (params.select.isBlocked !== undefined && params.select.isBlocked !== null) select.isBlocked = params.select.isBlocked;
    }
    try {
      const res: { user: { uuid?: string, isBlocked?: boolean } } | null =
        await this.prisma.userDevice.findUnique({ where: { fingerprint }, select: { user: { select } } });
      if (res === null) throw new ConflictException("device with this fingerprint does not exist");
      return res.user;
    } catch (e) {
      if (!(e instanceof PrismaClientValidationError)) throw e;
      throw new BadRequestException("The select statement needs at least one truthy value.");
    }
  }

  public async isExists(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    return (await this.prisma.userDevice.findUnique({ where: { fingerprint }, select: null }) !== null);
  }

  public register(params: { userUuid: string, name: string, fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    return this.prisma.userDevice.create({ data: { ...params, fingerprint }, select: null });
  }

  public async delete(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    await this.prisma.userDevice.delete({ where: { fingerprint }, select: null });
  }

  public async block(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    await this.prisma.userDevice.update({ where: { fingerprint }, data: { isBlocked: true }, select: null });
  }

  public async unblock(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    await this.prisma.userDevice.update({ where: { fingerprint }, data: { isBlocked: false }, select: null });
  }

  public isBlocked(params: { fingerprint: string }) {
    const fingerprint = Buffer.from(params.fingerprint, "hex");
    return this.prisma.userDevice.findUnique({ where: { fingerprint }, select: { isBlocked: true } });
  }
}
