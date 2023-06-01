import { ApiProperty } from '@nestjs/swagger';
import { Role, Users } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UsersEntity implements Users {
    constructor(partial: Partial<UsersEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    id: number;

    @ApiProperty()
    role: Role;
}
