import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreateOrUpdateCityGeonameDto
 */
export class CreateOrUpdateCityGeonameDto {
    @ApiProperty()
    @IsNotEmpty()
    cityName: string

    @ApiProperty()
    @IsNotEmpty()
    stateId: number
}
