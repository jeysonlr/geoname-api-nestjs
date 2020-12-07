import { Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';
import { GeonameStateEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateStateGeonameDto } from '../dto';
import { GeonameStateRepository } from '../repositories';
import { StringFormatterHelper } from './../../shared/helper';
import {
    CreateOrUpdateStateException,
    StateFindByIdNotFounException,
    StateOrAcronymExistsException,
    StateFindByNameNotFoundException,
    StateFindByAcronymNotFoundException,
} from '../exceptions';
import { StateFindAllException } from '../exceptions/state-find-all-exception';
import GeonameStateRepositoryInterface from '../repositories/geoname-state.repository.interface';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameStateService
 */
@Injectable()
export class GeonameStateService {
    constructor(
        @InjectRepository(GeonameStateRepository, 'databaseConnection')
        private readonly geonameStateRepository: GeonameStateRepositoryInterface,
        private readonly stringFormatter: StringFormatterHelper
    ) { }

    /**
     * @param {CreateOrUpdateStateGeonameDto} createOrUpdateStateDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async createState(createOrUpdateStateDto: CreateOrUpdateStateGeonameDto): Promise<GeonameStateEntity> {
        const createStateDtoToUpper = await this.transferObjectToDto(createOrUpdateStateDto);

        if (await this.geonameStateRepository.findByStateName(createStateDtoToUpper.stateName)) {
            throw new StateOrAcronymExistsException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.STATE_CONFLICT_EXISTS, createStateDtoToUpper.stateName)
            );
        }

        if (await this.geonameStateRepository.findByStateAcronym(createStateDtoToUpper.stateAcronym)) {
            throw new StateOrAcronymExistsException(
                this.stringFormatter.format(
                    ERROR_MESSAGES.ACRONYM_CONFLICT_EXISTS, createStateDtoToUpper.stateAcronym)
            );
        }

        try {
            return await this.geonameStateRepository.createState(createStateDtoToUpper);
        } catch (error) {
            throw new CreateOrUpdateStateException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_CREATE_ERROR, createStateDtoToUpper.stateName)
            );
        }
    }

    /**
     * @param {number} stateId
     * @param {CreateOrUpdateStateGeonameDto} createOrUpdateStateDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async updateState(stateId: number, createOrUpdateStateDto: CreateOrUpdateStateGeonameDto): Promise<GeonameStateEntity> {
        const stateData = await this.findById(stateId);

        const createStateDtoToUpper = await this.transferObjectToDto(createOrUpdateStateDto);
        stateData.stateName = createStateDtoToUpper.stateName;
        stateData.stateAcronym = createStateDtoToUpper.stateAcronym;

        const ifExistsStateName = await this.geonameStateRepository.findByStateName(createStateDtoToUpper.stateName);
        if (ifExistsStateName != undefined) {
            if (stateId !== Number(ifExistsStateName.stateId)) {
                throw new StateOrAcronymExistsException(
                    this.stringFormatter.format(ERROR_MESSAGES.STATE_CONFLICT_EXISTS, createStateDtoToUpper.stateName)
                );
            }
        }

        const ifExistsStateAcronym = await this.geonameStateRepository.findByStateAcronym(createStateDtoToUpper.stateAcronym);
        if (ifExistsStateAcronym != undefined) {
            if (stateId !== Number(ifExistsStateName.stateId)) {
                throw new StateOrAcronymExistsException(
                    this.stringFormatter.format(ERROR_MESSAGES.ACRONYM_CONFLICT_EXISTS, createStateDtoToUpper.stateAcronym)
                );
            }
        }

        try {
            return await this.geonameStateRepository.updateState(stateData);
        } catch (error) {
            throw new CreateOrUpdateStateException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_UPDATE_ERROR, createStateDtoToUpper.stateName)
            );
        }
    }

    /**
     * @return {*}  {Promise<GeonameStateEntity[]>}
     * @memberof GeonameStateService
     */
    async findAll(): Promise<GeonameStateEntity[]> {
        try {
            return await this.geonameStateRepository.findAll();
        } catch (error) {
            throw new StateFindAllException(
                ERROR_MESSAGES.STATE_FIND_ALL_ERROR_OCURRED
            );
        }
    }

    /**
     * @param {number} stateId
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async findById(stateId: number): Promise<GeonameStateEntity> {
        const stateData = await this.geonameStateRepository.findById(stateId);

        if (!stateData) {
            throw new StateFindByIdNotFounException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_FIND_BY_ID_NOT_FOUND, stateId.toString())
            );
        }
        return stateData;
    }

    /**
     * @param {string} stateName
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async findByStateName(stateName: string): Promise<GeonameStateEntity> {
        const stateData = await this.geonameStateRepository.findByStateName(stateName.toUpperCase());

        if (!stateData) {
            throw new StateFindByNameNotFoundException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_FIND_BY_NAME_NOT_FOUND, stateName)
            );
        }
        return stateData;
    }

    /**
     * @param {string} stateAcronym
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async findByStateAcronym(stateAcronym: string): Promise<GeonameStateEntity> {
        const stateData = await this.geonameStateRepository.findByStateAcronym(stateAcronym.toUpperCase());

        if (!stateData) {
            throw new StateFindByAcronymNotFoundException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_FIND_BY_ACRONYM_NOT_FOUND, stateAcronym)
            );
        }
        return stateData;
    }

    /**
     * @param {(CreateOrUpdateStateGeonameDto)} createOrUpdateStateDto
     * @return {*}  {Promise<CreateOrUpdateStateGeonameDto>}
     * @memberof GeonameStateService
     */
    async transferObjectToDto(createOrUpdateStateDto: CreateOrUpdateStateGeonameDto): Promise<CreateOrUpdateStateGeonameDto> {
        const { stateName, stateAcronym } = createOrUpdateStateDto;

        createOrUpdateStateDto = new CreateOrUpdateStateGeonameDto;
        createOrUpdateStateDto.stateName = stateName.toUpperCase();
        createOrUpdateStateDto.stateAcronym = stateAcronym.toUpperCase();

        return await createOrUpdateStateDto;
    }
}
