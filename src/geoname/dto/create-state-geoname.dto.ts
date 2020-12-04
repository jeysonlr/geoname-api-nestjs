import { IsNotEmpty, Length } from "class-validator";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreateStateGeonameDto
 */
export class CreateStateGeonameDto {
    @IsNotEmpty()
    stateName: string

    @IsNotEmpty()
    @Length(2, 2)
    stateAcronym: string
}
