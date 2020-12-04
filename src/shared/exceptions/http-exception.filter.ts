import { Response } from 'express';
import { HttpBaseException } from './http-base.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(HttpBaseException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpBaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const errors = exception.getResponse();
        response
            .status(status)
            .json({
                ...errors
            });
    }
}
