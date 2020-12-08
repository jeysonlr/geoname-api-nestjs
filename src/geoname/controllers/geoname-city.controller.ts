import { GeonameCityEntity } from '../entities';
import { GeonameCityService } from '../services';
import { Controller, Get } from '@nestjs/common';
import { OkResponseDataDto } from '../../shared/dto';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';

@Controller(ROUTES.CITY)
export class GeonameCityController {
    constructor(
        private readonly geonameCityService: GeonameCityService
    ) { }

    @Get()
    async getAll() {
        const geonameCitys = await this.geonameCityService.findAll();
        return new OkResponseDataDto<GeonameCityEntity[]>(
            SUCCESS_MESSAGES.GET_SUCCESS, geonameCitys
        );
    }
}
