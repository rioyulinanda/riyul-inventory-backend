import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, RoleGuard } from 'src/auth/auth.guard';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersEntity } from './entities/users.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOkResponse({ type: UsersEntity, isArray: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: UsersEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: UsersEntity })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOkResponse({ type: UsersEntity })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
