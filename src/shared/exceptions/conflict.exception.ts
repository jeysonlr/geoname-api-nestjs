import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { HttpBaseException } from './http-base.exception';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class ConflictException
 * @extends {HttpBaseException}
 */
export class ConflictException extends HttpBaseException {
    constructor (message: string, objectOrError?: string | object | any,
        description = HttpInternalMessages.CONFLICT) {
        super(
            HttpBaseException.createBody(
                objectOrError,
                message,
                description,
                HttpStatus.CONFLICT,
            ),
            HttpStatus.CONFLICT,
        );
    }
}
