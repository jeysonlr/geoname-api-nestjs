import { GeonameStateEntity } from "../entities";
import { CreateOrUpdateStateGeonameDto } from "../dto";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @interface GeonameStateRepositoryInterface
 */
export default interface GeonameStateRepositoryInterface {
    createState(createOrUpdateStateDto: CreateOrUpdateStateGeonameDto): Promise<GeonameStateEntity>;
    updateState(createOrUpdateStateDto: CreateOrUpdateStateGeonameDto): Promise<GeonameStateEntity>;
    findAll(): Promise<GeonameStateEntity[]>;
    findById(stateId: number): Promise<GeonameStateEntity | undefined>;
    findByStateName(stateName: string): Promise<GeonameStateEntity | undefined>;
    findByStateAcronym(stateAcronym: string): Promise<GeonameStateEntity | undefined>;
}
