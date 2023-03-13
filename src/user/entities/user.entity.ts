import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StatusEnum } from '../../utils/enums/status.enum';
import { UserTypeEnum } from '../../utils/enums/user-type.enum';
import { Role } from '../types';

@Entity()
export class User {
  constructor(props?: Partial<User>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn()
  readonly id: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({
    nullable: false,
  })
  readonly firstName: string;

  @Column({
    nullable: false,
  })
  readonly lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  readonly email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly phone: string;

  @Exclude()
  @Column({
    nullable: true,
    select: false,
  })
  readonly password: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.INACTIVE,
  })
  status: StatusEnum;
  //
  // @Column({
  //   type: 'enum',
  //   enum: UserTypeEnum,
  //   default: UserTypeEnum.USER,
  // })
  // userType: UserTypeEnum;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.AUTHOR,
  })
  role: Role;

  // @ManyToOne(_=>Role,role=>role.users)
  // readonly role: Role;

  // @Exclude()
  // @Column({
  //   type: 'timestamp with time zone',
  //   nullable: true,
  // })
  // readonly confirmedAt!: Date | null;

  @Exclude()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
