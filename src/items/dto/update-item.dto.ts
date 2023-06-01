import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsString()
  id_category: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  @IsNumber()
  usersId: number;
}
