import {MiddlewareConsumer, Module} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {KafkaModule} from "nestjs-kafka";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
      context: ({ req }) => ({ req }),
      playground: true,
    }),
  ],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KafkaModule).forRoutes('graphql');
  }
}
