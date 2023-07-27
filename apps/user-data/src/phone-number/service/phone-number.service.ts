import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/service/prisma.service";
import { PhoneNumber, Prisma } from "@platform/prisma-clients/user-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UniqueConstraintFailedError } from "../../prisma/error/unique-constraint-failed.error";
import { RecordNotFoundError } from "../../prisma/error/record-not-found.error";

@Injectable()
export class PhoneNumberService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {
  }

  async FindUnique(phoneNumberFindUniqueArgs: Prisma.PhoneNumberFindUniqueArgs): Promise<Partial<PhoneNumber> | null> {
    return await this.prisma.phoneNumber.findUnique(phoneNumberFindUniqueArgs);
  }

  async FindFirst(phoneNumberFindFirstArgs: Prisma.PhoneNumberFindFirstArgs): Promise<Partial<PhoneNumber> | null> {
    return await this.prisma.phoneNumber.findFirst(phoneNumberFindFirstArgs);
  }

  async FindMany(phoneNumberFindManyArgs: Prisma.PhoneNumberFindManyArgs): Promise<Partial<PhoneNumber>[]> {
    return await this.prisma.phoneNumber.findMany(phoneNumberFindManyArgs);
  }

  async Update(phoneNumberUpdateArgs: Prisma.PhoneNumberUpdateArgs): Promise<Partial<PhoneNumber>> {
    try {
      return await this.prisma.phoneNumber.update(phoneNumberUpdateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to update not found.");
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Count(phoneNumberCountArgs: Prisma.PhoneNumberCountArgs): Promise<number> {
    return await this.prisma.phoneNumber.count(phoneNumberCountArgs);
  }

  async Create(phoneNumberCreateArgs: Prisma.PhoneNumberCreateArgs): Promise<Partial<PhoneNumber>> {
    try {
      return await this.prisma.phoneNumber.create(phoneNumberCreateArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") throw new UniqueConstraintFailedError("Unique constant failed");
      }
      throw e;
    }
  }

  async Delete(phoneNumberDeleteArgs: Prisma.PhoneNumberDeleteArgs): Promise<Partial<PhoneNumber>> {
    try {
      return await this.prisma.phoneNumber.delete(phoneNumberDeleteArgs);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") throw new RecordNotFoundError("Record to delete not found.");
      }
      throw e;
    }
  }
}
