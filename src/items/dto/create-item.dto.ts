import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    user: string;

    @IsString()
    @ApiProperty()
    id_category: string;

    @IsNumber()
    @ApiProperty()
    quantity: number;

    @IsOptional()
    @ApiProperty()
    createdAt?: Date;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    userId: number;
}
