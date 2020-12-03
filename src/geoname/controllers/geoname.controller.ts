import { GeonameStateEntity } from '../entities';
import { Controller, Get } from '@nestjs/common';
import { GeonameStateService } from '../services';
import { OkResponseDataDto } from './../../shared/dto';
import { SUCCESS_MESSAGES, ROUTES } from '../constants';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameController
 */
@Controller(ROUTES.STATE)
export class GeonameController {
    constructor(
        private readonly geonameStateService: GeonameStateService
    ) { }

    @Get()
    async getAll() {
        const geonameStates = await this.geonameStateService.findAll();
        return new OkResponseDataDto<GeonameStateEntity[]>(
            SUCCESS_MESSAGES.GET_SUCCESS, geonameStates
        )
    }
}
