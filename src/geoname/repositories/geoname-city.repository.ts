import { ERROR_MESSAGES } from '../constants';
import { GeonameCityEntity } from "../entities";
import { CreateOrUpdateCityGeonameDto } from '../dto';
import { EntityRepository, Repository } from "typeorm";
import { CityDatabaseErrorException } from '../exceptions';
import { StringFormatterHelper } from './../../shared/helper';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameCityRepository
 * @extends {Repository<GeonameCityEntity>}
 */
@EntityRepository(GeonameCityEntity)
export class GeonameCityRepository extends Repository<GeonameCityEntity> {
    constructor(
        private readonly stringFormatter: StringFormatterHelper
    ) { super() }

    /**
     * @param {CreateOrUpdateCityGeonameDto} createOrUpdateCityDto
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityRepository
     */
    async createCity(createOrUpdateCityDto: CreateOrUpdateCityGeonameDto): Promise<GeonameCityEntity> {
        try {
            return await this.save(createOrUpdateCityDto);
        } catch (error) {
            throw new CityDatabaseErrorException(
                ERROR_MESSAGES.CITY_SAVE_DATABASE_ERROR
            );
        }
    }

    /**
     * @param {CreateOrUpdateCityGeonameDto} createOrUpdateCityDto
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityRepository
     */
    async updateCity(createOrUpdateCityDto: CreateOrUpdateCityGeonameDto): Promise<GeonameCityEntity> {
        try {
            return await this.save(createOrUpdateCityDto);
        } catch (error) {
            throw new CityDatabaseErrorException(
                ERROR_MESSAGES.CITY_UPDATE_DATABASE_ERROR
            );
        }
    }

    /**
     * @return {*}  {Promise<GeonameCityEntity[]>}
     * @memberof GeonameCityRepository
     */
    async findAll(): Promise<GeonameCityEntity[]> {
        try {
            return await this.find(
                { relations: ['state'] }
            );
        } catch (error) {
            throw new CityDatabaseErrorException(ERROR_MESSAGES.CITY_DATABASE_ERROR)
        }
    }

    /**
     * @param {number} cityId
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityRepository
     */
    async findById(cityId: number): Promise<GeonameCityEntity | undefined> {
        try {
            return await this.findOne(
                cityId,
                { relations: ['state'] }
            );
        } catch (error) {
            throw new CityDatabaseErrorException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.CITY_DATABASE_ERROR, cityId.toString()
                )
            );
        }
    }

    /**
     * @param {string} cityName
     * @return {*}  {Promise<GeonameCityEntity[]>}
     * @memberof GeonameCityRepository
     */
    async findByCityName(cityName: string): Promise<GeonameCityEntity | undefined> {
        try {
            return await this.findOne(
                { cityName: cityName },
                { relations: ['state'] }
            );
        } catch (error) {
            throw new CityDatabaseErrorException(
                this.stringFormatter.format(ERROR_MESSAGES.CITY_DATABASE_ERROR, cityName)
            );
        }
    }
}
