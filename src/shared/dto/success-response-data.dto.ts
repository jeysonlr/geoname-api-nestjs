import { isObject, isString } from 'util';
import { HttpStatus } from '@nestjs/common';
import { HttpInternalMessages } from '../enums';
import { ResponseDataDto } from './response-data.dto';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class SuccessResponseDataDto
 * @extends {ResponseDataDto}
 * @template D
 */
export class SuccessResponseDataDto<D> extends ResponseDataDto {
    private data: D[];

    constructor(
        message: string,
        data?: any,
        internalMessage: string = HttpInternalMessages.OK,
        statusCode: HttpStatus = HttpStatus.OK,
    ) {
        super(statusCode, internalMessage, message);
        this.data = SuccessResponseDataDto.createData<D>(data);
    }

    /**
     * @memberof SuccessResponseDataDto
     */
    public getData = (): D[] => {
        return this.data;
    }

    /**
     * @static
     * @template D
     * @param {D} objectOrData
     * @return {*}  {D[]}
     * @memberof SuccessResponseDataDto
     */
    public static createData<D>(objectOrData: D): D[] {
        if (!objectOrData) {
            return [];
        }

        if (isString(objectOrData)) {
            return [objectOrData];
        }

        if (isObject(objectOrData)) {
            return [objectOrData];
        }

        if (isObject(objectOrData) && Array.isArray(objectOrData)) {
            return [objectOrData];
        }

        return [objectOrData];
    }
}
