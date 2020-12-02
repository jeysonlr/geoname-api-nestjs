import { ValidationError } from 'class-validator';
import { forEach, map } from 'lodash';

export interface RequestErrorInterface {
    readonly constraint: string;
}

export class RequestError implements RequestErrorInterface {
    readonly constraint: string;

    constructor(constraint: string) {
        this.constraint = constraint;
    }

    /**
    * @returns string
    */
    public getConstraint(): string {
        return this.constraint;
    }

    static builderFromValidationError(validationErrors: ValidationError[]): RequestError[] {
        const errors: RequestError[] = [];
        map(validationErrors, (validationError: ValidationError) => {
            const { constraints } = validationError;
            return forEach(constraints, (value: string) => {
                errors.push(new RequestError(value));
            });
        });
        return errors;
    }
}
