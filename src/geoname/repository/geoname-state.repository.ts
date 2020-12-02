import { ERROR_MESSAGES } from '../constants';
import { GeonameStateEntity } from "../entity";
import { EntityRepository, Repository } from "typeorm";
import { StateDatabaseErrorException } from '../exceptions';
import { StringFormatterHelper } from './../../shared/helper';

@EntityRepository(GeonameStateEntity)
export class GeonameStateRepository extends Repository<GeonameStateEntity> {
    constructor(
        private readonly stringFormatter: StringFormatterHelper
    ) { super() }

    async findAll(): Promise<GeonameStateEntity[]> {
        try {
            return await this.find();
        } catch (error) {
            throw new StateDatabaseErrorException(ERROR_MESSAGES.STATE_DATABASE_ERROR)
        }
    }

    async findById(id: number): Promise<GeonameStateEntity> {
        try {
            return await this.findOne(id);
        } catch (error) {
            throw new StateDatabaseErrorException(
                this.stringFormatter.format(ERROR_MESSAGES.STATE_DATABASE_ERROR), id.toString())
        }
    }
}
