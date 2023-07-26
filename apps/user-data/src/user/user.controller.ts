import { Body, Controller, HttpCode, Inject, Post, UseInterceptors } from "@nestjs/common";
import { User, UserFindUniqueArgs,
  UserFindUniqueArgs, UserFindFirstArgs, UserFindManyArgs,
  UserUpdateArgs, UserCountArgs, UserCreateArgs, UserDeleteArgs
} from "@platform/prisma-clients/user-data";
import { UserService } from "./service/user.service";
import { PrismaErrorInterceptor } from "../prisma/interceptor/prisma-error.interceptor";

@Controller("user")
@UseInterceptors(PrismaErrorInterceptor)
export class UserController {
  constructor(@Inject(UserService) private user: UserService) {
  }

  @Post("find/unique")
  @HttpCode(200)
  async FindUnique(@Body() userFindUniqueArgs: UserFindUniqueArgs): Promise<Partial<User> | null> {
    return await this.user.FindUnique(userFindUniqueArgs);
  }

  @Post("find/first")
  @HttpCode(200)
  async FindFirst(@Body() userFindFirstArgs: UserFindFirstArgs): Promise<Partial<User> | null> {
    return await this.user.FindFirst(userFindFirstArgs);
  }

  @Post("find/many")
  @HttpCode(200)
  async FindMany(@Body() userFindManyArgs: UserFindManyArgs): Promise<Partial<User>[]> {
    return await this.user.FindMany(userFindManyArgs);
  }

  @Post("update")
  @HttpCode(200)
  async Update(@Body() userUpdateArgs: UserUpdateArgs): Promise<Partial<User>> {
    return await this.user.Update(userUpdateArgs);
  }

  @Post("count")
  @HttpCode(200)
  async Count(@Body() userCountArgs: UserCountArgs): Promise<number> {
    return await this.user.Count(userCountArgs);
  }

  @Post("create")
  @HttpCode(200)
  async Create(@Body() userCreateArgs: UserCreateArgs): Promise<Partial<User>> {
    return await this.user.Create(userCreateArgs);
  }

  @Post("delete")
  @HttpCode(200)
  async Delete(@Body() userDeleteArgs: UserDeleteArgs): Promise<Partial<User>> {
    return await this.user.Delete(userDeleteArgs);
  }
}
