import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemRepository } from './items.repository';
import { UsersService } from '../users/users.service';
// import { AuthGuard, RoleGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [ItemsController],
    providers: [
        ItemsService,
        ItemRepository,
        PrismaService,
        UsersService,
        // AuthGuard,
        // RoleGuard,
        JwtService,
    ],
})
export class ItemsModule {}
