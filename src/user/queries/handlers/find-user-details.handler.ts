import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserDetailsQuery } from '../find-user-details.query';
import { User } from '../../entities/user.entity';

@Injectable()
@QueryHandler(FindUserDetailsQuery)
export class FindUserDetailsHandler
  implements IQueryHandler<FindUserDetailsQuery>
{
  constructor(
    readonly queryBus: QueryBus,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async execute(query: FindUserDetailsQuery): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id: query.userId } });
  }
}
