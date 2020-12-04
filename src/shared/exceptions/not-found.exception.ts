import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { HttpBaseException } from './http-base.exception';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class NotFoundException
 * @extends {HttpBaseException}
 */
export class NotFoundException extends HttpBaseException {
    constructor(message: string, objectOrError?: string | object | any,
        description = HttpInternalMessages.NOT_FOUND) {
        super(
            HttpBaseException.createBody(
                objectOrError,
                message,
                description,
                HttpStatus.NOT_FOUND,
            ),
            HttpStatus.NOT_FOUND,
        );
    }
}
