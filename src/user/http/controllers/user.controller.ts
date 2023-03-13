import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserExceptionFilter } from '../exception-filters/create-user.exception-filter';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../../../authentication/http/token.guard';
import { Role } from '../../types';
import { DuplicateUserExceptionFilter } from '../exception-filters/duplicate-user.exception-filter';
import { CreateUserRequest } from '../requests/create-user.request';
import { CreateUserException } from '../../exceptions/create-user.exception';
import { CreateUserCommand } from '../../commands/create-user.command';
// import { MessagePattern } from '@nestjs/microservices';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../services/user.service';

@Controller()
@ApiTags('User')
@ApiBasicAuth()
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(TokenGuard)
  @UseFilters(new DuplicateUserExceptionFilter())
  @UseFilters(new CreateUserExceptionFilter())
  @Post('/user')
  async createUser(@Body() body: CreateUserRequest) {
    // if (body.role !== Role.STAFF_ADMIN ) {
    //   throw new CreateUserException(`You are not allowed to create ${body.role} user`);
    // }

    await this.commandBus.execute(new CreateUserCommand(body));
  }

  @UseGuards(TokenGuard)
  @UseFilters(new DuplicateUserExceptionFilter())
  @UseFilters(new CreateUserExceptionFilter())
  @Get('/user/me')
  async getUser(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get('/user/all')
  @UseGuards(TokenGuard)
  getAllUsers() {
    return this.userService.findAll();
  }

  @Put('user/change-password')
  @UseGuards(TokenGuard)
  changePassword(@Req() req, @Body() data) {
    return this.userService.changePassword(req.user.id, data);
  }

  @Put('user/change-password/:id')
  @UseGuards(TokenGuard)
  changePasswordForUser(@Req() req, @Param('id') id, @Body() data) {
    return this.userService.changePasswordForUser(id, data);
  }

  @Get('/user/:id')
  @UseGuards(TokenGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('/user/:id')
  @UseGuards(TokenGuard)
  updateUser(@Param('id') id: string, @Body() data) {
    return this.userService.updateUser(id, data);
  }

  // @MessagePattern({ cmd: 'validateToken' })
  // validateUser(input?: string) {
  //   return this.userRepository.findOneOrFail({ where: { id: input } });
  // }
}
