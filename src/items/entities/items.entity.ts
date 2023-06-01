import { Items } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ItemsEntity implements Items {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    user: string;

    @ApiProperty()
    id_category: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    id: number;
}
