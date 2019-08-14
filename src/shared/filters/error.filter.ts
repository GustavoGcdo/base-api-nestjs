import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Report } from '../notifiable/report';
import { Result } from '../result/result';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const responseOfRequest = host.switchToHttp().getResponse();
    const { response } = exception;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const error = exception.toString();

      return responseOfRequest
        .status(status)
        .send(
          new Result('Internal server error', false, null, [
            new Report('server', error),
          ]),
        );
    }

    const responseError = response.error;

    if (!responseError) {
      return responseOfRequest.status(status).send(response);
    }

    return responseOfRequest
      .status(status)
      .send(
        new Result(response.message, false, null, [
          new Report('server', responseError),
        ]),
      );
  }
}
