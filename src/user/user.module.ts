import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { BcryptService } from '../authentication/services/bcrypt.service';
import { UserController } from './http/controllers/user.controller';
import { FindUserDetailsHandler } from './queries/handlers/find-user-details.handler';
import { UserService } from './http/services/user.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    FindUserDetailsHandler,
    CreateUserHandler,
    BcryptService,
    UserService,
  ],
})
export class UserModule {}
