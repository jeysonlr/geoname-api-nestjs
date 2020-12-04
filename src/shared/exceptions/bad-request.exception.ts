import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { HttpBaseException } from './http-base.exception';

export class BadRequestException extends HttpBaseException {
    constructor (message: string, objectOrError?: string | object | any,
        description = HttpInternalMessages.BAD_REQUEST) {
        super(
            HttpBaseException.createBody(
                objectOrError,
                message,
                description,
                HttpStatus.BAD_REQUEST,
            ),
            HttpStatus.BAD_REQUEST,
        );
    }
}
