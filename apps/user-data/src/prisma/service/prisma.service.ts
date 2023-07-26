import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import {UserDataClient} from "@platform/prisma-clients";


@Injectable()
export class PrismaService extends UserDataClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
