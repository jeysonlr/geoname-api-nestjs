import { Injectable } from '@nestjs/common';

interface String {
    format(str: string, ...replacements: string[]): string;
}

@Injectable()
export class StringFormatterHelper extends String {
    format(str: string, ...replacements: string[]) {
        let i = 0;
        return str.replace(/{}/g, function () {
            return typeof replacements[i] != 'undefined' ? replacements[i++] : '';
        });
    };
}
