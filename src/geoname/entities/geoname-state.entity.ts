import { IsNotEmpty, IsNumberString, Length } from "class-validator";
import {
    Column,
    Unique,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameStateEntity
 */
@Entity({ name: 'geoname_estados', schema: 'public' })
@Unique(['stateName', 'stateAcronym'])
export class GeonameStateEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    id: number;

    @IsNotEmpty()
    @Column('varchar')
    @IsNumberString()
    stateName: string;

    @Length(2, 2)
    @IsNotEmpty()
    @Column('varchar')
    stateAcronym: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
