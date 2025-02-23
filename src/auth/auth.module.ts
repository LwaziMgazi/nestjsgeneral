import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {  AuthController } from './controller/auth.controller'
import { JwtModule } from '@nestjs/jwt';
import {  PassportModule} from '@nestjs/passport';
import { localStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
@Module({
  imports : [PassportModule, JwtModule.register({
    secret : 'SECRET',
        signOptions :{expiresIn:'60s'}
  }),
UsersModule],
  providers: [AuthService, JwtService,localStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
