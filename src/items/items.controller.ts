import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard, RoleGuard } from 'src/auth/auth.guard';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ItemsEntity } from './entities/items.entity';

@Controller('items')
@ApiTags('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    @ApiOkResponse({ type: ItemsEntity, isArray: true })
    listitems() {
        return this.itemsService.get();
    }

    @Get(':id')
    @ApiOkResponse({ type: ItemsEntity })
    async getItem(@Param('id') id: string) {
        const itemId = parseInt(id, 10);
        const item = await this.itemsService.findOne(itemId);
        if (!item) {
            throw new NotFoundException('item not found');
        }
        return item;
    }

    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiCreatedResponse({ type: ItemsEntity })
    async createitem(
        @Body() createItemDto: CreateItemDto,
        @Request() request: any,
    ) {
        const {} = createItemDto;
        console.log(createItemDto.userId);
        const userId = createItemDto.userId;

        if (!userId) {
            throw new Error('User ID is required.');
        }

        const newItem = await this.itemsService.post({
            ...createItemDto,
            userId,
        });

        return newItem;
    }

    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOkResponse({ type: ItemsEntity })
    async updatePartialItem(
        @Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
        @Body('userId') userId: number,
    ) {
        const itemId = parseInt(id, 10);

        const updatedItem = await this.itemsService.patch(
            +itemId,
            updateItemDto,
            userId,
        );

        if (!updatedItem) {
            throw new NotFoundException('Item not found');
        }

        return updatedItem;
    }

    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOkResponse({ type: ItemsEntity })
    async deleteitem(@Param('id') id: string) {
        const itemId = parseInt(id, 10);
        return await this.itemsService.delete(itemId);
    }
}
