import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemRepository {
    constructor(private prisma: PrismaService) {}

    async get() {
        return await this.prisma.items.findMany();
    }

    async findOne(id: number) {
        const items = await this.prisma.items.findUnique({
            where: { id: +id },
            include: {
                user: true,
            },
        });
        if (!items) {
            throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        items.user.password = undefined;
        return items;
    }

    async post(createItemDto: CreateItemDto) {
        const { name, description, id_category, createdAt, quantity, userId } =
            createItemDto;

        if (!id_category) {
            throw new Error('User ID is required.');
        }

        const newItem = await this.prisma.items.create({
            data: {
                name,
                description,
                id_category,
                quantity,
                userId,
            },
        });

        return newItem;
    }

    async delete(id: number) {
        const items = await this.prisma.items.findUnique({
            where: { id: +id },
        });
        if (!items) {
            throw new NotFoundException(`Item with ID ${id} not found.`);
        }
        await this.prisma.items.delete({
            where: { id: +id },
        });
        return items;
    }

    async put(id: number, data: any, userId: number) {
        const updatedItem = await this.prisma.items.update({
            where: { id: id },
            data: {
                ...data,
                usersId: userId,
            },
        });
        return updatedItem;
    }

    async updatePartialItem(id: number, data: any, userId: number) {
        const updatedItem = await this.prisma.items.update({
            where: { id: +id },
            data: {
                ...data,
                userId: userId,
            },
        });
        return updatedItem;
    }
}
