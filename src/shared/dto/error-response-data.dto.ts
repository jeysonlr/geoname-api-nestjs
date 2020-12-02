import { RequestError } from '../dto';
import { ResponseDataDto } from '../dto';
import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';

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
     * @returns RequestError[]
     */
    public getError = (): RequestError[] => {
        return this.error;
    }
}
