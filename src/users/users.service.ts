import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        const data = await this.prismaService.users.findMany();
        data.forEach((user) => {
            user.password = undefined;
        });
        return data;
    }

    async findOne(id: number) {
        const data = await this.prismaService.users.findUnique({
            where: {
                id: Number(id), // Convert id to a number
            },
            include: { item: true },
        });
        data.password = undefined;
        return data || null;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const isUserExist = await this.prismaService.users.findUnique({
            where: { id: id },
        });
        if (!isUserExist) {
            return new NotFoundException('User not found');
        }
        const updateUsers = await this.prismaService.users.update({
            where: { id: id },
            data: { ...updateUserDto },
        });
        updateUsers.password = undefined;
        return updateUsers;
    }

    async remove(id: number) {
        const isUserExist = await this.prismaService.users.delete({
            where: { id: id },
        });
        return isUserExist;
    }
}
