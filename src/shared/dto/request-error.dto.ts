import { forEach, map } from 'lodash';
import { ValidationError } from 'class-validator';

/**
 * @export
 * @interface RequestErrorInterface
 */
export interface RequestErrorInterface {
    readonly constraint: string;
}

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class RequestError
 * @implements {RequestErrorInterface}
 */
export class RequestError implements RequestErrorInterface {
    readonly constraint: string;

    constructor(constraint: string) {
        this.constraint = constraint;
    }

    /**
     * @return {*}  {string}
     * @memberof RequestError
     */
    public getConstraint(): string {
        return this.constraint;
    }

    /**
     * @static
     * @param {ValidationError[]} validationErrors
     * @return {*}  {RequestError[]}
     * @memberof RequestError
     */
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
