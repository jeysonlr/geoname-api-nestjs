import { IsNotEmpty } from "class-validator";
import { GeonameStateEntity } from './geoname-state.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameCityEntity
 */
@Entity({ name: 'geoname_cidades', schema: 'public' })
export class GeonameCityEntity {
    @PrimaryGeneratedColumn({ name: 'cityId', type: 'integer' })
    cityId: number;

    @IsNotEmpty()
    @Column('varchar')
    cityName: string;

    @IsNotEmpty()
    stateId: number;

    @ManyToOne(() => GeonameStateEntity)
    @JoinColumn({
        name: 'stateId',
        referencedColumnName: 'stateId'
    })
    state: GeonameStateEntity[]

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
