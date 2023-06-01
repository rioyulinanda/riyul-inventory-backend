import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() loginForm: AuthDto) {
        return this.authService.login(loginForm);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerForm: CreateUserDto) {
        return this.authService.register(registerForm);
    }
}
