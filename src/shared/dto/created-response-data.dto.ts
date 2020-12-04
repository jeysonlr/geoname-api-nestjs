import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { SuccessResponseDataDto } from './success-response-data.dto';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreatedResponseDataDto
 * @extends {SuccessResponseDataDto<D>}
 * @template D
 */
export class CreatedResponseDataDto<D> extends SuccessResponseDataDto<D> {
    constructor(
        message: string,
        data?: any,
        internalMessage: string = HttpInternalMessages.CREATED,
        statusCode: HttpStatus = HttpStatus.CREATED,
    ) {
        super(message, data, internalMessage, statusCode);
    }
}
