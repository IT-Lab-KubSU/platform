import { Body, Controller, HttpCode, Inject, Post, UseInterceptors } from "@nestjs/common";
import { PhoneNumber, Prisma } from "@prisma/client";
import { PhoneNumberService } from "./service/phone-number.service";
import { PrismaErrorInterceptor } from "../prisma/interceptor/prisma-error.interceptor";

@Controller("phoneNumber")
@UseInterceptors(PrismaErrorInterceptor)
export class PhoneNumberController {
  constructor(@Inject(PhoneNumberService) private phoneNumber: PhoneNumberService) {
  }

  @Post("find/unique")
  @HttpCode(200)
  async FindUnique(@Body() phoneNumberFindUniqueArgs: Prisma.PhoneNumberFindUniqueArgs): Promise<Partial<PhoneNumber> | null> {
    return await this.phoneNumber.FindUnique(phoneNumberFindUniqueArgs);
  }

  @Post("find/first")
  @HttpCode(200)
  async FindFirst(@Body() phoneNumberFindFirstArgs: Prisma.PhoneNumberFindFirstArgs): Promise<Partial<PhoneNumber> | null> {
    return await this.phoneNumber.FindFirst(phoneNumberFindFirstArgs);
  }

  @Post("find/many")
  @HttpCode(200)
  async FindMany(@Body() phoneNumberFindManyArgs: Prisma.PhoneNumberFindManyArgs): Promise<Partial<PhoneNumber>[]> {
    return await this.phoneNumber.FindMany(phoneNumberFindManyArgs);
  }

  @Post("update")
  @HttpCode(200)
  async Update(@Body() phoneNumberUpdateArgs: Prisma.PhoneNumberUpdateArgs): Promise<Partial<PhoneNumber>> {
    return await this.phoneNumber.Update(phoneNumberUpdateArgs);
  }

  @Post("count")
  @HttpCode(200)
  async Count(@Body() phoneNumberCountArgs: Prisma.PhoneNumberCountArgs): Promise<number> {
    return await this.phoneNumber.Count(phoneNumberCountArgs);
  }

  @Post("create")
  @HttpCode(200)
  async Create(@Body() phoneNumberCreateArgs: Prisma.PhoneNumberCreateArgs): Promise<Partial<PhoneNumber>> {
    return await this.phoneNumber.Create(phoneNumberCreateArgs);
  }

  @Post("delete")
  @HttpCode(200)
  async Delete(@Body() phoneNumberDeleteArgs: Prisma.PhoneNumberDeleteArgs): Promise<Partial<PhoneNumber>> {
    return await this.phoneNumber.Delete(phoneNumberDeleteArgs);
  }
}
