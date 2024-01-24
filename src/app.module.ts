import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

import { CinemaModule } from '@/modules/cinema/cinema.module';
import { DeliveryModule } from '@/modules/delivery/delivery.module';
import { OtpsModule } from '@/modules/otps/otps.module';
import { UsersModule } from '@/modules/users/users.module';
import { WakeUpModule } from '@/modules/wakeup/wakeup.module';

import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/static/'),
        watch: true
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, { dbName: 'shift' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res })
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: path.join(__dirname, '..', 'static')
    }),
    OtpsModule,
    UsersModule,
    CinemaModule,
    DeliveryModule,
    WakeUpModule
  ],
  providers: []
})
export class AppModule {}
