import { Body, ConflictException, Controller, HttpCode, Post, ValidationPipe } from "@nestjs/common";
import { DeviceService } from "./service/device.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { RegisterDto } from "./dto/register.dto";
import { FingerprintDto } from "./dto/fingerprint.dto";
import { UserDto } from "./dto/user.dto";

@Controller("device")
export class DeviceController {
  constructor(private readonly device: DeviceService) {
  }

  @Post("user")
  @HttpCode(200)
  async User(@Body(new ValidationPipe()) params: UserDto) {
    return this.device.User(params);
  }

  @Post("is-exists")
  @HttpCode(200)
  async IsExists(@Body(new ValidationPipe()) params: FingerprintDto) {
    return await this.device.isExists(params);
  }

  @Post("register")
  @HttpCode(200)
  async Register(@Body(new ValidationPipe()) params: RegisterDto) {
    try {
      await this.device.register(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code === "P2002") throw new ConflictException("device with the same fingerprint already exists");
      if (e.code === "P2003") throw new ConflictException("user with this uuid does not exist");
      throw e;
    }
  }


  @Post("delete")
  @HttpCode(200)
  async Delete(@Body(new ValidationPipe()) params: FingerprintDto) {
    try {
      await this.device.delete(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("device with this fingerprint does not exist");
    }
  }


  @Post("block")
  @HttpCode(200)
  async Block(@Body(new ValidationPipe()) params: FingerprintDto) {
    try {
      await this.device.block(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("device with this fingerprint does not exist");
    }
  }

  @Post("unblock")
  @HttpCode(200)
  async Unblock(@Body(new ValidationPipe()) params: FingerprintDto) {
    try {
      await this.device.unblock(params);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) throw e;
      if (e.code !== "P2025") throw e;
      throw new ConflictException("device with this fingerprint does not exist");
    }
  }


  @Post("is-blocked")
  @HttpCode(200)
  async IsBlocked(@Body(new ValidationPipe()) params: FingerprintDto) {
    const isBlocked = await this.device.isBlocked(params);
    if (isBlocked !== null) return isBlocked.isBlocked;
    throw new ConflictException("device with this fingerprint does not exist");
  }
}
