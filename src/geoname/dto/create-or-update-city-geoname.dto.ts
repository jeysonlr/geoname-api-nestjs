import { IsNotEmpty, Length } from "class-validator";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class CreateOrUpdateCityGeonameDto
 */
export class CreateOrUpdateCityGeonameDto {
    @IsNotEmpty()
    cityName: string

    @IsNotEmpty()
    stateId: string
}
