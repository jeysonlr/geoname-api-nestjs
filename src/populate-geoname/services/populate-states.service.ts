import { ConfigService } from '@nestjs/config';
import { HttpService, Injectable } from '@nestjs/common';
import { StringFormatterHelper } from './../../shared/helper';
import { InternalServerErrorException } from 'src/shared/exceptions';
import { URL_IBGE_STATES, URL_IBGE_CITYS, ERROR_MESSAGES } from '../constants';
import { GeonameCityService, GeonameStateService } from '../../geoname/services';
import { CreateOrUpdateCityGeonameDto, CreateOrUpdateStateGeonameDto } from '../../geoname/dto';
import {
    CityExistsToStateException,
    CreateOrUpdateCityException,
    CreateOrUpdateStateException,
    StateDeleteException,
    StateFindAllException,
    StateOrAcronymExistsException
} from 'src/geoname/exceptions';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class PopulateStatesService
 */
@Injectable()
export class PopulateStatesService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        private readonly stringFormatter: StringFormatterHelper,
        private readonly geonameCityService: GeonameCityService,
        private readonly geonameStateService: GeonameStateService,
    ) { }

    /**
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof PopulateStatesService
     */
    async controllerPopulateStatesAndCitys(): Promise<string> {
        const findAllCitys = await this.geonameCityService.findAll();
        const findAllStates = await this.geonameStateService.findAll();

        if (findAllCitys.length > 0 || findAllStates.length > 0) {
            await this.removeRegistersCitys(findAllCitys);
            await this.removeRegistersStates(findAllStates);
            return 'Dados de estados e cidades excluidos!';
        } else {
            await this.getPopulateAllStates();
            return 'Dados de estados e cidades adicionados!'
        }
    }

    /**
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof PopulateStatesService
     */
    async getPopulateAllStates(): Promise<void> {
        const urlIBGEState = this.configService.get<string>(URL_IBGE_STATES);

        const response = await this.httpService.get(
            urlIBGEState,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        ).toPromise()
            .then(async response => {
                const responseStatesIbgeDto = await response.data.map(async (response) => {
                    const createStateDto = new CreateOrUpdateStateGeonameDto();
                    createStateDto.stateAcronym = response.sigla;
                    createStateDto.stateName = response.nome;

                    const resultInsertState = await this.geonameStateService.createState(createStateDto);

                    return await this.getAllCitysByState(resultInsertState.stateId, response.id);

                });
                return await responseStatesIbgeDto;
            })
            .catch(error => {
                if (error instanceof StateFindAllException) {
                    throw error;
                }

                if (error instanceof StateOrAcronymExistsException) {
                    throw error;
                }

                if (error instanceof StateDeleteException) {
                    throw error;
                }

                if (error instanceof CreateOrUpdateStateException) {
                    throw error;
                }
                throw new InternalServerErrorException(
                    ERROR_MESSAGES.FAILED_TO_POPULATE_STATE, error
                );
            });
    }

    /**
     * @param {number} resultInsertStateId
     * @param {number} stateId
     * @return {*}  {Promise<GeonameCityEntity>}
     * @memberof PopulateStatesService
     */
    async getAllCitysByState(resultInsertStateId: number, stateId: number): Promise<void> {
        const urlIBGECity = this.configService.get<string>(URL_IBGE_CITYS);

        const urlIBGECitys = this.stringFormatter.format(urlIBGECity, stateId.toString());

        const response = await this.httpService.get(
            urlIBGECitys,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        ).toPromise()
            .then(async response => {
                const responseCitysIbgeDto = await response.data.map(async (response) => {
                    const createCityDto = new CreateOrUpdateCityGeonameDto();
                    createCityDto.stateId = resultInsertStateId;
                    createCityDto.cityName = response.nome;

                    return await this.geonameCityService.createCity(createCityDto);
                });

                return await responseCitysIbgeDto;
            })
            .catch(error => {
                if (error instanceof CityExistsToStateException) {
                    throw error;
                }

                if (error instanceof CreateOrUpdateCityException) {
                    throw error;
                }

                throw new InternalServerErrorException(
                    ERROR_MESSAGES.FAILED_TO_POPULATE_STATE, error
                );
            });
    }

    /**
     * @return {*}  {Promise<void>}
     * @memberof PopulateStatesService
     */
    async removeRegistersCitys(findAllCitys: any): Promise<void> {
        await findAllCitys.map(async (response) => {
            await this.geonameCityService.deleteCity(response.cityId);
        });
    }

    /**
     * @return {*}  {Promise<void>}
     * @memberof PopulateStatesService
     */
    async removeRegistersStates(findAllStates: any): Promise<void> {
        await findAllStates.map(async (response) => {
            await this.geonameStateService.deleteState(response.stateId);
        });
    }
}
