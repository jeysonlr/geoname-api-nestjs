import { Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';
import { GeonameCityEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { GeonameCityRepository } from '../repositories';
import { StateFindAllException } from '../exceptions/state-find-all-exception';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameCityService
 */
@Injectable()
export class GeonameCityService {
    constructor(
        @InjectRepository(GeonameCityRepository, 'databaseConnection')
        private readonly geonameCityRepository: GeonameCityRepository
    ) { }

    /**
     * @return {*}  {Promise<GeonameCityEntity[]>}
     * @memberof GeonameCityService
     */
    async findAll(): Promise<GeonameCityEntity[]> {
        try {
            return await this.geonameCityRepository.findAll();
        } catch (error) {
            throw new StateFindAllException(
                ERROR_MESSAGES.STATE_FIND_ALL_ERROR_OCURRED
            );
        }
    }
}
