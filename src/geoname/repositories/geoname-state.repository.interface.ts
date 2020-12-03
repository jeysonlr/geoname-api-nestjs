import { GeonameStateEntity } from "../entities";
import { CreateStateGeonameDto, UpdateStateGeonameDto } from "../dto";

export default interface GeonameStateRepositoryInterface {
    createState(createStateDto: CreateStateGeonameDto): Promise<GeonameStateEntity>;
    updateState(updateStateGeonameDto: UpdateStateGeonameDto): Promise<GeonameStateEntity>;
    findAll(): Promise<GeonameStateEntity[]>;
    findById(id: number): Promise<GeonameStateEntity | undefined>;
    findByStateName(stateName: string): Promise<GeonameStateEntity | undefined>;
    findByStateAcronym(stateAcronym: string): Promise<GeonameStateEntity | undefined>;
}
