import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { OkResponseDataDto } from 'src/shared/dto';
import { PopulateStatesService } from '../services';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class PopulateStateController
 */
@ApiTags('Populate or exclude States and Citys')
@Controller(ROUTES.POPULATE_OR_EXCLUDE)
export class PopulateStateController {
    constructor(
        private populateStateService: PopulateStatesService
    ) { }

    @Get()
    async populateState() {
        const result = await this.populateStateService.controllerPopulateStatesAndCitys();
        return new OkResponseDataDto<[]>(
            SUCCESS_MESSAGES.GET_SUCCESS, result
        );
    }
}
