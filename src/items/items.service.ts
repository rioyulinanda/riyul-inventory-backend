import { Injectable } from '@nestjs/common';
import { ItemRepository } from './items.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private itemRepo: ItemRepository) {}

  async get() {
    return this.itemRepo.get();
  }

  async post(createItemDto: CreateItemDto) {
    return this.itemRepo.post(createItemDto);
  }

  async findOne(id: number) {
    return this.itemRepo.findOne(id);
  }

  async patch(id: number, updateItemDto: UpdateItemDto, usersId: number) {
    return this.itemRepo.updatePartialItem(id, updateItemDto, usersId);
  }

  async delete(id: number) {
    return this.itemRepo.delete(id);
  }
}
