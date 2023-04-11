import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IErrorBody } from '../../../core/http/response/types';
import { CreateUserException } from 'src/user/exceptions/create-user.exception';

@Catch(CreateUserException)
export class CreateUserExceptionFilter
  implements ExceptionFilter<CreateUserException>
{
  catch(exception: CreateUserException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      title: 'Could not create user',
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      detail: exception.message,
    } as IErrorBody);
  }
}
