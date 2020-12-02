import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';

export class ResponseDataDto {
    constructor(
        protected statusCode: HttpStatus,
        protected internalMessage?: string | HttpInternalMessages,
        protected message?: string
    ) { }

    /**
    * @returns HttpStatus
    */
    public getStatusCode = (): HttpStatus => {
        return this.statusCode;
    }

    /**
     * @returns string
     */
    public getMessage = (): string => {
        return this.message;
    }

    /**
     * @returns string
     */
    public getInternalMessage = (): string | HttpInternalMessages => {
        return this.internalMessage;
    }
}
