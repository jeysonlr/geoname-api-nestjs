import { Injectable } from '@nestjs/common';

/**
 * @interface String
 */
interface String {
    format(str: string, ...replacements: string[]): string;
}

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class StringFormatterHelper
 * @extends {String}
 */
@Injectable()
export class StringFormatterHelper extends String {
    format(str: string, ...replacements: string[]) {
        let i = 0;
        return str.replace(/{}/g, function () {
            return typeof replacements[i] != 'undefined' ? replacements[i++] : '';
        });
    };
}
