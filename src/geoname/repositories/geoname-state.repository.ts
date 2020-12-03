import { ERROR_MESSAGES } from '../constants';
import { GeonameStateEntity } from "../entities";
import { EntityRepository, Repository } from "typeorm";
import { StringFormatterHelper } from '../../shared/helper';
import { StateDatabaseErrorException } from '../exceptions';
import { CreateStateGeonameDto, UpdateStateGeonameDto } from '../dto';
import GeonameStateRepositoryInterface from './geoname-state.repository.interface';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameStateRepository
 * @extends {Repository<GeonameStateEntity>}
 */
@EntityRepository(GeonameStateEntity)
export class GeonameStateRepository extends Repository<GeonameStateEntity> implements GeonameStateRepositoryInterface {
    constructor(
        private readonly stringFormatter: StringFormatterHelper
    ) { super() }

    /**
     * @param {CreateStateGeonameDto} createStateDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateRepository
     */
    async createState(createStateDto: CreateStateGeonameDto): Promise<GeonameStateEntity> {
        try {
            return await this.save(createStateDto);
        } catch (error) {
            throw new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
        }
    }

    /**
     * @param {UpdateStateGeonameDto} updateStateGeonameDto
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateRepository
     */
    async updateState(updateStateGeonameDto: UpdateStateGeonameDto): Promise<GeonameStateEntity> {
        try {
            return await this.save(updateStateGeonameDto);
        } catch (error) {
            throw new StateDatabaseErrorException(ERROR_MESSAGES.STATE_UPDATE_DATABASE_ERROR)
        }
    }

    /**
     * @return {*}  {Promise<GeonameStateEntity[]>}
     * @memberof GeonameStateRepository
     */
    async findAll(): Promise<GeonameStateEntity[]> {
        try {
            return await this.find();
        } catch (error) {
            console.log('aqui   ' + error)
            throw new StateDatabaseErrorException(ERROR_MESSAGES.STATE_DATABASE_ERROR)
        }
    }

    /**
     * @param {number} id
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateRepository
     */
    async findById(id: number): Promise<GeonameStateEntity | undefined> {
        try {
            return await this.findOne(id);
        } catch (error) {
            throw new StateDatabaseErrorException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_DATABASE_ERROR), id.toString())
        }
    }

    /**
     * @param {string} stateName
     * @return {*}  {Promise<GeonameStateEntity[]>}
     * @memberof GeonameStateRepository
     */
    async findByStateName(stateName: string): Promise<GeonameStateEntity | undefined> {
        try {
            return await this.findOne(stateName);
        } catch (error) {
            throw new StateDatabaseErrorException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_DATABASE_ERROR), stateName);
        }
    }

    /**
     * @param {string} stateAcronym
     * @return {*}  {Promise<GeonameStateEntity>}
     * @memberof GeonameStateRepository
     */
    async findByStateAcronym(stateAcronym: string): Promise<GeonameStateEntity | undefined> {
        try {
            return await this.findOne(stateAcronym);
        } catch (error) {
            throw new StateDatabaseErrorException(
                this.stringFormatter.format(ERROR_MESSAGES.ACRONYM_DATABASE_ERROR), stateAcronym)
        }
    }
}
