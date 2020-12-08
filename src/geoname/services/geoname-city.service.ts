import { Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';
import { GeonameCityEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateCityGeonameDto } from '../dto';
import { GeonameCityRepository } from '../repositories';
import { GeonameStateService } from './geoname-state.service';
import { StringFormatterHelper } from './../../shared/helper';
import {
    CityDeleteException,
    StateFindAllException,
    CityExistsToStateException,
    CityFindByIdNotFounException,
    CityFindByNameNotFoundException,
    CreateOrUpdateCityException
} from '../exceptions';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameCityService
 */
@Injectable()
export class GeonameCityService {
    constructor(
        @InjectRepository(GeonameCityRepository, 'databaseConnection')
        private readonly geonameCityRepository: GeonameCityRepository,
        private readonly stringFormatter: StringFormatterHelper,
        private readonly geonameStateService: GeonameStateService
    ) { }

    /**
     * @param {CreateOrUpdateCityGeonameDto} createOrUpdateCityDto
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityService
     */
    async createCity(createOrUpdateCityDto: CreateOrUpdateCityGeonameDto): Promise<GeonameCityEntity> {
        await this.geonameStateService.findById(createOrUpdateCityDto.stateId);

        const createCityDtoToUpper = await this.transferObjectToDto(createOrUpdateCityDto);

        const existsCity = await this.geonameCityRepository.findByCityName(createCityDtoToUpper.cityName);

        if (existsCity && existsCity.stateId === createOrUpdateCityDto.stateId) {
            throw new CityExistsToStateException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.CITY_TO_STATE_CONFLICT_EXISTS, createCityDtoToUpper.cityName)
            );
        }

        try {
            return await this.geonameCityRepository.createCity(createCityDtoToUpper);
        } catch (error) {
            throw new CreateOrUpdateCityException(
                this.stringFormatter.format(ERROR_MESSAGES.CITY_CREATE_ERROR, createCityDtoToUpper.cityName)
            );
        }
    }

    /**
     * @param {number} stateId
     * @param {CreateOrUpdateCityGeonameDto} createOrUpdateCityDto
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityService
     */
    async updateCity(cityId: number, createOrUpdateCityDto: CreateOrUpdateCityGeonameDto): Promise<GeonameCityEntity> {
        const cityData = await this.findById(cityId);

        const createCityDtoToUpper = await this.transferObjectToDto(createOrUpdateCityDto);
        cityData.cityName = createCityDtoToUpper.cityName;
        cityData.stateId = createCityDtoToUpper.stateId;

        const ifExistsCityName = await this.geonameCityRepository.findByCityName(createCityDtoToUpper.cityName);

        if (ifExistsCityName
            && ifExistsCityName.stateId === createOrUpdateCityDto.stateId
            && cityId !== Number(ifExistsCityName.cityId)) {
            throw new CityExistsToStateException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.CITY_TO_STATE_CONFLICT_EXISTS, createCityDtoToUpper.cityName)
            );
        }

        try {
            return await this.geonameCityRepository.updateCity(cityData);
        } catch (error) {
            throw new CreateOrUpdateCityException(
                this.stringFormatter.format(ERROR_MESSAGES.CITY_UPDATE_ERROR, createCityDtoToUpper.cityName)
            );
        }
    }

    /**
     * @param {number} cityId
     * @return {*}  {Promise<void>}
     * @memberof GeonameCityService
     */
    async deleteCity(cityId: number): Promise<void> {
        const deleteData = await this.findById(cityId);

        const geonameCity = new GeonameCityEntity;
        geonameCity.cityId = deleteData.cityId;
        geonameCity.cityName = deleteData.cityName;
        geonameCity.stateId = deleteData.stateId;

        try {
            await this.geonameCityRepository.delete(geonameCity)
        } catch (error) {
            throw new CityDeleteException(
                this.stringFormatter.format(ERROR_MESSAGES.CITY_DELETE_ERROR, cityId.toString())
            );
        }
    }

    /**
     * @return {*}  {Promise<GeonameCityEntity[]>}
     * @memberof GeonameCityService
     */
    async findAll(): Promise<GeonameCityEntity[]> {
        try {
            return await this.geonameCityRepository.findAll();
        } catch (error) {
            throw new StateFindAllException(
                ERROR_MESSAGES.CITY_FIND_ALL_ERROR_OCURRED
            );
        }
    }

    /**
     * @param {number} cityId
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityService
     */
    async findById(cityId: number): Promise<GeonameCityEntity> {
        const cityData = await this.geonameCityRepository.findById(cityId);

        if (!cityData) {
            throw new CityFindByIdNotFounException(
                this.stringFormatter.format(ERROR_MESSAGES.CITY_FIND_BY_ID_NOT_FOUND, cityId.toString())
            );
        }
        return cityData;
    }

    /**
     * @param {string} cityName
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof GeonameCityService
     */
    async findByCityName(cityName: string): Promise<GeonameCityEntity> {
        const stateData = await this.geonameCityRepository.findByCityName(
            cityName.toUpperCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "")
        );

        if (!stateData) {
            throw new CityFindByNameNotFoundException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.CITY_FIND_BY_NAME_NOT_FOUND, cityName
                )
            );
        }
        return stateData;
    }

    /**
     * @param {(CreateOrUpdateCityGeonameDto)} createOrUpdateCityDto
     * @return {*}  {Promise<CreateOrUpdateCityGeonameDto>}
     * @memberof GeonameCityService
     */
    async transferObjectToDto(createOrUpdateCityDto: CreateOrUpdateCityGeonameDto): Promise<CreateOrUpdateCityGeonameDto> {
        const { cityName, stateId } = createOrUpdateCityDto;

        createOrUpdateCityDto = new CreateOrUpdateCityGeonameDto;
        createOrUpdateCityDto.cityName = cityName.toUpperCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "");
        createOrUpdateCityDto.stateId = stateId;

        return await createOrUpdateCityDto;
    }
}
