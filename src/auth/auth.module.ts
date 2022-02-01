import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MicroservicesModule } from 'src/microservices/microservices.module';

@Module({
  imports: [
    ConfigModule,
    MicroservicesModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
