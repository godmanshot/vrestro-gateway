import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MicroservicesModule } from 'src/microservices/microservices.module';

@Module({
  imports: [
    ConfigModule,
    MicroservicesModule,
    HttpModule,
  ],
  providers: [],
  controllers: [OauthController]
})
export class OauthModule {}
