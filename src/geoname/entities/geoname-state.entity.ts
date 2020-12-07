import { IsNotEmpty, Length } from "class-validator";
import { GeonameCityEntity } from "./geoname-city.entity";
import {
    Column,
    Unique,
    Entity,
    OneToMany,
    JoinColumn,
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
    @PrimaryGeneratedColumn({ name: 'stateId', type: 'integer' })
    stateId: number;

    @IsNotEmpty()
    @Column('varchar')
    stateName: string;

    @Length(2, 2)
    @IsNotEmpty()
    @Column('varchar')
    stateAcronym: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;

    @OneToMany(() => GeonameCityEntity, city => city.state)
    @JoinColumn({
        name: 'stateId',
        referencedColumnName: 'stateId'
    })
    citys: GeonameCityEntity[];
}
