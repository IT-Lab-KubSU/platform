import { Module } from "@nestjs/common";
import { PhoneNumberController } from "./phone-number.controller";
import { PhoneNumberService } from "./service/phone-number.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService]
})
export class PhoneNumberModule {
}
