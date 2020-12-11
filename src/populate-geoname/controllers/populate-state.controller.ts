import { ApiTags } from '@nestjs/swagger';
import { SUCCESS_MESSAGES } from '../constants';
import { Controller, Get } from '@nestjs/common';
import { OkResponseDataDto } from 'src/shared/dto';
import { PopulateStatesService } from '../services';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class PopulateStateController
 */
@ApiTags('Populate or exclude States and Citys')
@Controller('/populateorexclude')
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
