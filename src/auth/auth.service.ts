import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { jwtConstants} from "./constant"
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
    ){}

  async login(authDto: AuthDto): Promise<any>{
    const user = await this.prismaService.users.findUnique({
      where:{
        email: authDto.email,
      }
    })
    if(!user){
      throw new NotFoundException()
    }
    const isMatch = await bcrypt.compare(authDto.password, user?.password)
    if(!isMatch){
      throw new UnauthorizedException()
    }
    const payload = {id: user.id,name:user.name, role:user.role, email: user.email}
    const options: JwtSignOptions = { 
      secret: jwtConstants.secret,
      expiresIn: '1h', 
      algorithm: 'HS256' };
    return {
      email: user.email,
      name: user.name,
      access_token:await this.jwtService.signAsync(payload, options),      
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any>{
    const isUserExist = await this.prismaService.users.findUnique({
      where: {
              email: createUserDto.email
            }
    })
    if(isUserExist){
      throw new ConflictException()
    }
    const newUser = await this.prismaService.users.create(
      {data:{
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10)
      }}
    )
    newUser.password = undefined
    return newUser
  }
}
