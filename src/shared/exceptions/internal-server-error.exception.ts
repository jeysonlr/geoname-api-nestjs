import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { HttpBaseException } from './http-base.exception';

export class InternalServerErrorException extends HttpBaseException {
    constructor(message: string, objectOrError?: string | object | any,
        description = HttpInternalMessages.INTERNAL_SERVER_ERROR) {
        super(
            HttpBaseException.createBody(
                objectOrError,
                message,
                description,
                HttpStatus.INTERNAL_SERVER_ERROR,
            ),
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
