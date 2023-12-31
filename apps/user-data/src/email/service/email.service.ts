import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/service/prisma.service';
import { Email, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UniqueConstraintFailedError } from "../../prisma/error/unique-constraint-failed.error";
import { RecordNotFoundError } from "../../prisma/error/record-not-found.error";

@Injectable()
export class EmailService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {
  }

  async FindUnique(emailFindUniqueArgs: Prisma.EmailFindUniqueArgs): Promise<Partial<Email> | null> {
    return await this.prisma.email.findUnique(emailFindUniqueArgs);
  }

  async FindFirst(emailFindFirstArgs: Prisma.EmailFindFirstArgs): Promise<Partial<Email> | null> {
    return await this.prisma.email.findFirst(emailFindFirstArgs);
  }

  async FindMany(emailFindManyArgs: Prisma.EmailFindManyArgs): Promise<Partial<Email>[]> {
    return await this.prisma.email.findMany(emailFindManyArgs);
  }

  async Update(emailUpdateArgs: Prisma.EmailUpdateArgs): Promise<Partial<Email>> {
    try {
      return await this.prisma.email.update(emailUpdateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to update not found.");
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Count(emailCountArgs: Prisma.EmailCountArgs): Promise<number> {
    return await this.prisma.email.count(emailCountArgs);
  }

  async Create(emailCreateArgs: Prisma.EmailCreateArgs): Promise<Partial<Email>> {
    try {
      return await this.prisma.email.create(emailCreateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Delete(emailDeleteArgs: Prisma.EmailDeleteArgs): Promise<Partial<Email>> {
    try {
      return await this.prisma.email.delete(emailDeleteArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to delete not found.");
      }
      throw e;
    }
  }
}
