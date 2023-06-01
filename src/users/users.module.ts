import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import {JwtService} from "@nestjs/jwt"
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaService, 
    JwtService,
    AuthGuard
  ],
})
export class UsersModule {}
