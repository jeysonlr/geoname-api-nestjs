import { HttpInternalMessages } from '../enums';
import { SuccessResponseDataDto } from './success-response-data.dto';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class OkResponseDataDto
 * @extends {SuccessResponseDataDto<D>}
 * @template D
 */
export class OkResponseDataDto<D> extends SuccessResponseDataDto<D> {
    constructor(
        message: string = HttpInternalMessages.OK,
        data?: any,
    ) {
        super(message, data);
    }
}
