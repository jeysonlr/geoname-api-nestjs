import { Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';
import { GeonameStateEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { GeonameStateRepository } from '../repositories';
import { StringFormatterHelper } from './../../shared/helper';
import {
    CreateStateGeonameDto,
    UpdateStateGeonameDto
} from '../dto';
import {
    CreateOrUpdateStateException,
    StateOrAcronymExistsException
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
     * @param {CreateStateGeonameDto} createStateDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async createState(createStateDto: CreateStateGeonameDto): Promise<GeonameStateEntity> {
        const { stateName, stateAcronym } = createStateDto;

        if (await this.geonameStateRepository.findByStateName(stateName)) {
            throw new StateOrAcronymExistsException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_CONFLICT_EXISTS), stateName
            );
        }
        if (await this.geonameStateRepository.findByStateAcronym(stateAcronym)) {
            throw new StateOrAcronymExistsException(
                this.stringFormatter.format(ERROR_MESSAGES.ACRONYM_CONFLICT_EXISTS), stateAcronym
            );
        }

        try {
            return await this.geonameStateRepository.createState(createStateDto);
        } catch (error) {
            throw new CreateOrUpdateStateException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_CREATE_ERROR), stateName)
        }
    }

    /**
     * @param {number} id
     * @param {UpdateStateGeonameDto} updateStateDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateService
     */
    async updateState(id: number, updateStateDto: UpdateStateGeonameDto): Promise<GeonameStateEntity> {
        const { stateName, stateAcronym } = updateStateDto;

        const ifExistsStateName = await this.geonameStateRepository.findByStateName(stateName);
        if (ifExistsStateName != undefined) {
            if (id !== Number(ifExistsStateName.id)) {
                throw new StateOrAcronymExistsException(
                    this.stringFormatter.format(ERROR_MESSAGES.STATE_CONFLICT_EXISTS), stateName
                );
            }
        }

        const ifExistsStateAcronym = await this.geonameStateRepository.findByStateAcronym(stateAcronym);
        if (ifExistsStateAcronym != undefined) {
            if (id !== Number(ifExistsStateAcronym.id)) {
                throw new StateOrAcronymExistsException(
                    this.stringFormatter.format(ERROR_MESSAGES.ACRONYM_CONFLICT_EXISTS), stateAcronym
                );
            }
        }

        try {
            return await this.geonameStateRepository.updateState(updateStateDto);
        } catch (error) {
            throw new CreateOrUpdateStateException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_CREATE_ERROR), stateName)
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
            console.log(error)
            throw new StateFindAllException(
                ERROR_MESSAGES.STATE_FIND_ALL_ERROR_OCURRED
            );
        }
    }
}
