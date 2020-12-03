import { IsNotEmpty, Length } from "class-validator";

export class UpdateStateGeonameDto {
    @IsNotEmpty()
    stateName: string

    @IsNotEmpty()
    @Length(2, 2)
    stateAcronym: string
}
