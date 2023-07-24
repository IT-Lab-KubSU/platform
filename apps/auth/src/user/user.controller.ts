import { Body, ConflictException, Controller, HttpCode, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { UuidDto } from "./dto/uuid.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { DevicesDto } from "./dto/devices.dto";

@Controller("user")
export class UserController {
  constructor(private readonly user: UserService) {
  }

  @Post("devices")
  @HttpCode(200)
  async Devices(@Body(new ValidationPipe()) params: DevicesDto) {
    if (await this.user.isExists({ uuid: params.uuid })) return await this.user.devices(params);
    else throw new ConflictException("user with this uuid does not exist");
  }

  @Post("is-exists")
  @HttpCode(200)
  async IsExists(@Body(new ValidationPipe()) params: UuidDto) {
    return await this.user.isExists(params);
  }

  @Post("register")
  @HttpCode(200)
  async Register(@Body(new ValidationPipe()) params: UuidDto) {
    try {
      await this.user.register(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2002") throw e;
      throw new ConflictException("user with the same uuid already exists");
    }
  }

  @Post("delete")
  @HttpCode(200)
  async Delete(@Body(new ValidationPipe()) params: UuidDto) {
    try {
      await this.user.delete(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("user with this uuid does not exist");
    }
  }

  @Post("block")
  @HttpCode(200)
  async Block(@Body(new ValidationPipe()) params: UuidDto) {
    try {
      await this.user.block(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("user with this uuid does not exist");
    }
  }

  @Post("unblock")
  @HttpCode(200)
  async Unblock(@Body(new ValidationPipe()) params: UuidDto) {
    try {
      await this.user.unblock(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("user with this uuid does not exist");
    }
  }

  @Post("is-blocked")
  @HttpCode(200)
  async IsBlocked(@Body(new ValidationPipe()) params: UuidDto) {
    const isBlocked = await this.user.isBlocked(params);
    if (isBlocked !== null) return isBlocked.isBlocked;
    throw new ConflictException("user with this uuid does not exist");
  }
}
