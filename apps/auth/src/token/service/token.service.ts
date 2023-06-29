import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../user/service/user.service";
import { DeviceService } from "../../device/service/device.service";
import { PrismaService } from "../../Prisma/service/prisma.service";
import { PrismaPromise } from "@prisma/client";
import { SHA256, UUIDv4 } from "../../const/regex";

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService,
              private readonly user: UserService,
              private readonly device: DeviceService,
              private readonly prisma: PrismaService) {
  }

  public async CheckRefresh(params: { refresh_token: string }) {
    try {
      await this.CheckRefreshTokenAssert(params);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async GenerateAccess(params: { refresh_token: string }) {
    const data = await this.CheckRefreshTokenAssert(params);
    return await this.jwt.signAsync({
      type: "access",
      user_uuid: data.user_uuid,
      device_fingerprint: data.device_fingerprint
    }, { expiresIn: 600 });
  }

  public async GenerateRefresh(params: { user_uuid: string, device_fingerprint: string, device_name?: string | null }) {
    const { is_user_blocked, is_device_blocked } = await this.GenerateRefreshBlocksChecker(params);
    if (is_user_blocked) throw new ConflictException("The user is blocked");
    if (is_device_blocked) throw new ConflictException("The device is blocked");
    return await this.jwt.signAsync({
      type: "refresh",
      user_uuid: params.user_uuid,
      device_fingerprint: params.device_fingerprint
    }, {
      expiresIn: "7d"
    });
  }

  private async JwtVerifyGuard<T extends object = any>(params: { jwt_token: string }) {
    try {
      return await this.jwt.verifyAsync<T>(params.jwt_token);
    } catch (e) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  private async IsUserAndDeviceBlockedAssert(params: { user_uuid: string, device_fingerprint: string }) {
    const res = await this.prisma.$transaction([
      this.user.isBlocked({ uuid: params.user_uuid }),
      this.device.isBlocked({ fingerprint: params.device_fingerprint }),
      this.device.getUserUuidAsPrismaPromise({ fingerprint: params.device_fingerprint })
    ]);
    if (res[0] === null) throw new ConflictException("user with this uuid does not exist");
    if (res[1] === null || res[2] === null) throw new ConflictException("device with this fingerprint does not exist");
    if (res[0].isBlocked) throw new ConflictException("The user is blocked");
    if (res[1].isBlocked) throw new ConflictException("The device is blocked");
    if (res[2].userUuid !== params.user_uuid) throw new ConflictException("The device is connected to another user");
  }

  private async CheckRefreshTokenAssert(params: { refresh_token: string }) {
    const data = await this.JwtVerifyGuard<{ user_uuid: string, device_fingerprint: string, type: string }>({ jwt_token: params.refresh_token });
    if (typeof data !== "object") throw new BadRequestException("JWT payload does not object");
    if (typeof data.user_uuid !== "string") throw new BadRequestException("user_uuid field does not string");
    if (!UUIDv4.test(data.user_uuid)) throw new BadRequestException("user_uuid field does not uuid");
    if (typeof data.device_fingerprint !== "string") throw new BadRequestException("device_fingerprint field does not string");
    if (!SHA256.test(data.device_fingerprint)) throw new BadRequestException("device_fingerprint field does not sha256");
    if (typeof data.type !== "string") throw new BadRequestException("type field does not string");
    if (data.type !== "refresh") throw new BadRequestException("type field does not equal \"refresh\" value");
    await this.IsUserAndDeviceBlockedAssert(data);
    return data;
  }

  private async GenerateRefreshBlocksChecker(params: { user_uuid: string, device_fingerprint: string, device_name?: string | null }) {
    const transaction: PrismaPromise<any>[] = [];
    const user_exists = await this.user.isExists({ uuid: params.user_uuid });
    const device_exists = await this.device.isExists({ fingerprint: params.device_fingerprint });
    if (user_exists) {
      if (device_exists) {
        if ((await this.device.getUserUuidAsPrismaPromise({ fingerprint: params.device_fingerprint }))?.userUuid !== params.user_uuid)
          throw new ConflictException("The device is connected to another user");
      } else {
        if (params.device_name === null || params.device_name === undefined)
          throw new ConflictException("The device does not exist, but the new device name is not specified");
        transaction.push(
          this.device.register({
            userUuid: params.user_uuid,
            fingerprint: params.device_fingerprint,
            name: params.device_name
          }));
      }
    } else {
      if (device_exists)
        throw new ConflictException("The device is connected to another user");
      if (params.device_name === null || params.device_name === undefined)
        throw new ConflictException("The device does not exist, but the new device name is not specified");
      transaction.push(
        this.user.register({ uuid: params.user_uuid }),
        this.device.register({
          userUuid: params.user_uuid,
          fingerprint: params.device_fingerprint,
          name: params.device_name
        }));
    }
    transaction.push(
      this.user.isBlocked({ uuid: params.user_uuid }),
      this.device.isBlocked({ fingerprint: params.device_fingerprint })
    );
    const transaction_res = await this.prisma.$transaction(transaction);
    const is_user_blocked = transaction_res[transaction_res.length - 2]?.isBlocked as boolean | undefined;
    const is_device_blocked = transaction_res[transaction_res.length - 1]?.isBlocked as boolean | undefined;
    return { is_user_blocked, is_device_blocked };
  }
}
