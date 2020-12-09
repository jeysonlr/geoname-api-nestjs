import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreateOrUpdateStateGeonameDto
 */
export class CreateOrUpdateStateGeonameDto {
    @ApiProperty()
    @IsNotEmpty()
    stateName: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 2)
    stateAcronym: string
}
