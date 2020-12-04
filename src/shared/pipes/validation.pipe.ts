import { isEmpty } from 'lodash';
import { RequestError } from '../dto';
import { validate } from 'class-validator';
import { ERROR_MESSAGES } from '../constants';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '../exceptions';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class ValidationPipe
 * @implements {PipeTransform<any>}
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, { metatype }: ArgumentMetadata) {

        if (isEmpty(value)) {
            throw new BadRequestException(ERROR_MESSAGES.NO_REQUEST_BODY_SENT);
        }

        /**
         * Bypass the validation step when these metatype doesn't have schemas attached
         */
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        const requestErrors = RequestError.builderFromValidationError(errors);

        if (errors.length > 0) {
            throw new BadRequestException(ERROR_MESSAGES.REQUEST_ERROR, requestErrors);
        }
        return value;
    }

    /**
     * Check is metatype argument is a native JavaScript type
     * @param metatype
     */
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
