import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from '../user/entities/user.entity';
import { NestJwtStrategy } from './passport/strategy/jwt.strategy';
import { AuthenticationController } from './http/controllers/authentication.controller';
import { BcryptService } from './services/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenStorageProvider } from './providers/token-storage.provider';
import { DatabaseStrategy } from './passport/strategy/database.strategy';
import { CoreModule } from '../core/core.module';
import { JwtStorage } from './storage/jwt.storage';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule,
  ],
  providers: [
    DatabaseStrategy,
    NestJwtStrategy,
    TokenStorageProvider,
    BcryptService,
    JwtStorage,
    JwtService,
  ],
  controllers: [AuthenticationController],
  exports: [BcryptService, JwtStorage],
})
export class AuthenticationModule {}
