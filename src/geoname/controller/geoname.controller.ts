import { Controller, Get } from '@nestjs/common';

@Controller()
export class GeonameController {
    // constructor(
    //     private readonly absenceService: AbsenceService
    // ) { }

    @Get('/')
    async getAll() {
        await console.log('ola, rodou!')
        return 'olá'
    }
}
