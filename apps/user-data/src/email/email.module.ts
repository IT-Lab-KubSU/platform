import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./service/email.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {
}
