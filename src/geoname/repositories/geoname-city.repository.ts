import { ERROR_MESSAGES } from '../constants';
import { GeonameCityEntity } from "../entities";
import { EntityRepository, Repository } from "typeorm";
import { StateDatabaseErrorException } from '../exceptions';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameCityRepository
 * @extends {Repository<GeonameCityEntity>}
 */
@EntityRepository(GeonameCityEntity)
export class GeonameCityRepository extends Repository<GeonameCityEntity> {

    /**
     * @return {*}  {Promise<GeonameCityEntity[]>}
     * @memberof GeonameCityRepository
     */
    async findAll(): Promise<GeonameCityEntity[]> {
        try {
            return await this.find({ relations: ['citys'] });
        } catch (error) {
            throw new StateDatabaseErrorException(ERROR_MESSAGES.STATE_DATABASE_ERROR)
        }
    }
}
