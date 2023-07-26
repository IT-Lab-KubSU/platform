import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/service/prisma.service";
import { User, UserFindUniqueArgs,
  UserFindUniqueArgs, UserFindFirstArgs, UserFindManyArgs,
  UserUpdateArgs, UserCountArgs, UserCreateArgs, UserDeleteArgs
} from "@platform/prisma-clients/user-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UniqueConstraintFailedError } from "../../prisma/error/unique-constraint-failed.error";
import { RecordNotFoundError } from "../../prisma/error/record-not-found.error";

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {
  }

  async FindUnique(userFindUniqueArgs: UserFindUniqueArgs): Promise<Partial<User> | null> {
    return await this.prisma.user.findUnique(userFindUniqueArgs);
  }

  async FindFirst(userFindFirstArgs: UserFindFirstArgs): Promise<Partial<User> | null> {
    return await this.prisma.user.findFirst(userFindFirstArgs);
  }

  async FindMany(userFindManyArgs: UserFindManyArgs): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany(userFindManyArgs);
  }

  async Update(userUpdateArgs: UserUpdateArgs): Promise<Partial<User>> {
    try {
      return await this.prisma.user.update(userUpdateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to update not found.");
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Count(userCountArgs: UserCountArgs): Promise<number> {
    return await this.prisma.user.count(userCountArgs);
  }

  async Create(userCreateArgs: UserCreateArgs): Promise<Partial<User>> {
    try {
      return await this.prisma.user.create(userCreateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Delete(userDeleteArgs: UserDeleteArgs): Promise<Partial<User>> {
    try {
      return await this.prisma.user.delete(userDeleteArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to delete not found.");
      }
      throw e;
    }
  }
}
