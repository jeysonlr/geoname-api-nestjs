import { HttpInternalMessages } from '../enums';
import { SuccessResponseDataDto } from './success-response-data.dto';

export class OkResponseDataDto<D> extends SuccessResponseDataDto<D> {
    constructor(
        message: string = HttpInternalMessages.OK,
        data?: any,
    ) {
        super(message, data);
    }
}
