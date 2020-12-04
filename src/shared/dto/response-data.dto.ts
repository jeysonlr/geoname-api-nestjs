import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class ResponseDataDto
 */
export class ResponseDataDto {
    constructor(
        protected statusCode: HttpStatus,
        protected internalMessage?: string | HttpInternalMessages,
        protected message?: string
    ) { }

    /**
     * @memberof ResponseDataDto
     */
    public getStatusCode = (): HttpStatus => {
        return this.statusCode;
    }

    /**
     * @memberof ResponseDataDto
     */
    public getMessage = (): string => {
        return this.message;
    }

    /**
     * @memberof ResponseDataDto
     */
    public getInternalMessage = (): string | HttpInternalMessages => {
        return this.internalMessage;
    }
}
