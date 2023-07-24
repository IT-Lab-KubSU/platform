import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthClient } from "@platform/prisma-clients";
import { DevicesDto } from "../dto/devices.dto";
import { PrismaClientValidationError } from "@prisma/client/runtime";

@Injectable()
export class UserService {
  constructor(private readonly prisma: AuthClient) {
  }

  public async devices(params: DevicesDto): Promise<{ name?: string, fingerprint?: string, isBlocked?: boolean }[]> {
    let select: { name?: boolean, fingerprint?: boolean, isBlocked?: boolean } | undefined = {
      name: true, fingerprint: true, isBlocked: true
    };
    if (params.select !== undefined && params.select !== null) {
      select = {};
      if (params.select.name !== undefined && params.select.name !== null) select.name = params.select.name;
      if (params.select.fingerprint !== undefined && params.select.fingerprint !== null) select.fingerprint = params.select.fingerprint;
      if (params.select.isBlocked !== undefined && params.select.isBlocked !== null) select.isBlocked = params.select.isBlocked;
    }
    try {
      const res: { name?: string, isBlocked?: boolean, fingerprint?: Buffer }[] =
        await this.prisma.userDevice.findMany({ where: { userUuid: params.uuid }, select });
      return res.map(value => ({ ...value, fingerprint: value.fingerprint?.toString("hex") }));
    } catch (e) {
      if (!(e instanceof PrismaClientValidationError)) throw e;
      throw new BadRequestException("The select statement needs at least one truthy value.");
    }
  }

  public async isExists(params: { uuid: string }) {
    return (await this.prisma.user.findUnique({ where: params, select: null }) !== null);
  }

  public register(params: { uuid: string }) {
    return this.prisma.user.create({ data: params, select: null });
  }

  public async delete(params: { uuid: string }) {
    await this.prisma.user.delete({ where: params, select: null });
  }

  public async block(params: { uuid: string }) {
    await this.prisma.user.update({ where: params, data: { isBlocked: true }, select: null });
  }

  public async unblock(params: { uuid: string }) {
    await this.prisma.user.update({ where: params, data: { isBlocked: false }, select: null });
  }

  public isBlocked(params: { uuid: string }) {
    return this.prisma.user.findUnique({ where: params, select: { isBlocked: true } });
  }
}
