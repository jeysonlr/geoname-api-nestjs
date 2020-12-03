import { IsNotEmpty, Length } from "class-validator";
import {
    Column,
    Unique,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity({ name: 'geoname_estados', schema: 'public' })
@Unique(['stateName', 'stateAcronym'])
export class GeonameStateEntity {
    @PrimaryColumn({ type: 'integer' })
    id: number;

    @IsNotEmpty()
    @Column('text')
    stateName: string;

    @Length(2, 2)
    @IsNotEmpty()
    @Column('text')
    stateAcronym: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
