import { IsNotEmpty, Length } from "class-validator";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreateOrUpdateStateGeonameDto
 */
export class CreateOrUpdateStateGeonameDto {
    @IsNotEmpty()
    stateName: string

    @IsNotEmpty()
    @Length(2, 2)
    stateAcronym: string
}
