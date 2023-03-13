export class CreateUserCommand {
  constructor(
    readonly data: {
      readonly firstName: string;
      readonly lastName: string;
      readonly email: string;
      readonly password: string;
      readonly phone?: string;
    },
  ) {}
}
