import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { HttpBaseException } from './http-base.exception';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class UnauthorizedException
 * @extends {HttpBaseException}
 */
export class UnauthorizedException extends HttpBaseException {
    constructor(message: string, objectOrError?: string | object | any,
        description = HttpInternalMessages.UNAUTHORIZED) {
        super(
            HttpBaseException.createBody(
                objectOrError,
                message,
                description,
                HttpStatus.UNAUTHORIZED,
            ),
            HttpStatus.UNAUTHORIZED,
        );
    }
}
