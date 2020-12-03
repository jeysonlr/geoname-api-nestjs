import { HttpStatus } from '@nestjs/common';
import { isObject, isString } from 'util';
import { HttpInternalMessages } from '../enums';
import { ResponseDataDto } from './response-data.dto';

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
     * @returns D[]
     */
    public getData = (): D[] => {
        return this.data;
    }

    public static createData<D>(objectOrData: D): D[] {
        if (!objectOrData) {
            return [];
        }

        if (isString(objectOrData)) {
            return [objectOrData];
        }

        if (isObject(objectOrData) && Array.isArray(objectOrData)) {
            return objectOrData;
        }

        return [objectOrData];
    }
}
