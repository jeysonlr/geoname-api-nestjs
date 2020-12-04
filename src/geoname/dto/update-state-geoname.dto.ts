import { IsNotEmpty, Length } from "class-validator";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class UpdateStateGeonameDto
 */
export class UpdateStateGeonameDto {
    @IsNotEmpty()
    stateName: string

    @IsNotEmpty()
    @Length(2, 2)
    stateAcronym: string
}
