import { Global, Module } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PrismaService } from "./service/prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {
}
