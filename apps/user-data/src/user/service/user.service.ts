import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/service/prisma.service";
import { Prisma, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UniqueConstraintFailedError } from "../../prisma/error/unique-constraint-failed.error";
import { RecordNotFoundError } from "../../prisma/error/record-not-found.error";

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {
  }

  async FindUnique(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<Partial<User> | null> {
    return await this.prisma.user.findUnique(userFindUniqueArgs);
  }

  async FindFirst(userFindFirstArgs: Prisma.UserFindFirstArgs): Promise<Partial<User> | null> {
    return await this.prisma.user.findFirst(userFindFirstArgs);
  }

  async FindMany(userFindManyArgs: Prisma.UserFindManyArgs): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany(userFindManyArgs);
  }

  async Update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<Partial<User>> {
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

  async Count(userCountArgs: Prisma.UserCountArgs): Promise<number> {
    return await this.prisma.user.count(userCountArgs);
  }

  async Create(userCreateArgs: Prisma.UserCreateArgs): Promise<Partial<User>> {
    try {
      return await this.prisma.user.create(userCreateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Delete(userDeleteArgs: Prisma.UserDeleteArgs): Promise<Partial<User>> {
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
