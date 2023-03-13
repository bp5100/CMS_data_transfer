import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../../user/entities/user.entity';
import { BcryptService } from '../../services/bcrypt.service';

@Injectable()
export class DatabaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :username OR user.phone = :username', {
        username,
      })
      .select(['user.id', 'user.email', 'user.password'])
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password supplied');
    }

    // if (!user.confirmedAt) {
    //   throw new UnauthorizedException('You must accept the invitation before you log in. Please check your email first.');
    // }

    if (await this.bcryptService.verifyCredentials(user, password)) {
      return user;
    }

    throw new UnauthorizedException('Invalid email or password supplied');
  }
}
