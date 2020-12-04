import { RequestError } from '../dto';
import { ResponseDataDto } from '../dto';
import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class ErrorResponseDataDto
 * @extends {ResponseDataDto}
 */
export class ErrorResponseDataDto extends ResponseDataDto {
    private error: RequestError[];

    constructor(
        message: string,
        error?: RequestError[],
        internalMessage: string | HttpInternalMessages = HttpInternalMessages.INTERNAL_SERVER_ERROR,
        statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        super(statusCode, internalMessage, message);
        this.error = error;
    }

    /**
     * @memberof ErrorResponseDataDto
     */
    public getError = (): RequestError[] => {
        return this.error;
    }
}
