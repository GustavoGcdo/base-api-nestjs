import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Report } from '../notifiable/report';
import { Result } from '../result/result';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const responseOfRequest = host.switchToHttp().getResponse();
        const { response } = exception;

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const reponseError = response.error;

        if (!reponseError) {
            return responseOfRequest.status(status).send(response);
        }

        return responseOfRequest
            .status(status)
            .send(
                new Result(response.message, false, null, [
                    new Report('server', reponseError),
                ]),
            );
    }
}
