/*
 * Copyright (C) 2022 GritFeat Solutions. - All Rights Reserved
 *
 * Unauthorized copying or redistribution of this file in source and binary forms via any medium
 * is strictly prohibited.
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { comparePasswords } from '../../../authentication/http/controllers/authentication.controller';
import { BcryptService } from '../../../authentication/services/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcrypt: BcryptService,
  ) {}

  findAll() {
    return this.userRepository.createQueryBuilder('user').getMany();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id.toString() } });
  }

  async changePassword(id: number, data) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: id })
      .addSelect('user.password')
      .getOne();
    const areEqual = await comparePasswords(user.password, data.oldPassword);
    if (!areEqual) {
      throw new HttpException(
        'Username or password is incorrect',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      return this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .where('user.id=:id', { id: +id })
        .set({
          password: await this.bcrypt.hashPassword(data.password),
        })
        .execute();
    }
  }

  async changePasswordForUser(id: number, data) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .where('user.id=:id', { id: +id })
      .set({
        password: await this.bcrypt.hashPassword(data.password),
      })
      .execute();
  }

  updateUser(id, data) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .where('user.id=:id', { id: +id })
      .set({
        ...data,
      })
      .execute();
  }
}
