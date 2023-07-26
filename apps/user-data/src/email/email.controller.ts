import { Body, Controller, HttpCode, Inject, Post, UseInterceptors } from "@nestjs/common";
import { EmailFindUniqueArgs, EmailFindFirstArgs, EmailFindManyArgs, EmailUpdateArgs, EmailCountArgs, EmailCreateArgs, EmailDeleteArgs, Email } from "@platform/prisma-clients/user-data";
import { EmailService } from "./service/email.service";
import { PrismaErrorInterceptor } from "../prisma/interceptor/prisma-error.interceptor";

@Controller("email")
@UseInterceptors(PrismaErrorInterceptor)
export class EmailController {
  constructor(@Inject(EmailService) private email: EmailService) {
  }

  @Post("find/unique")
  @HttpCode(200)
  async FindUnique(@Body() emailFindUniqueArgs: EmailFindUniqueArgs): Promise<Partial<Email> | null> {
    return await this.email.FindUnique(emailFindUniqueArgs);
  }

  @Post("find/first")
  @HttpCode(200)
  async FindFirst(@Body() emailFindFirstArgs: EmailFindFirstArgs): Promise<Partial<Email> | null> {
    return await this.email.FindFirst(emailFindFirstArgs);
  }

  @Post("find/many")
  @HttpCode(200)
  async FindMany(@Body() emailFindManyArgs: EmailFindManyArgs): Promise<Partial<Email>[]> {
    return await this.email.FindMany(emailFindManyArgs);
  }

  @Post("update")
  @HttpCode(200)
  async Update(@Body() emailUpdateArgs: EmailUpdateArgs): Promise<Partial<Email>> {
    return await this.email.Update(emailUpdateArgs);
  }

  @Post("count")
  @HttpCode(200)
  async Count(@Body() emailCountArgs: EmailCountArgs): Promise<number> {
    return await this.email.Count(emailCountArgs);
  }

  @Post("create")
  @HttpCode(200)
  async Create(@Body() emailCreateArgs: EmailCreateArgs): Promise<Partial<Email>> {
    return await this.email.Create(emailCreateArgs);
  }

  @Post("delete")
  @HttpCode(200)
  async Delete(@Body() emailDeleteArgs: EmailDeleteArgs): Promise<Partial<Email>> {
    return await this.email.Delete(emailDeleteArgs);
  }
}
