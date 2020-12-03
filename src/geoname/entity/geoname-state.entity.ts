import { IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from "typeorm";

@Unique(['stateName', 'stateAcronym'])
@Entity({ name: 'geoname_estados', schema: 'public' })
export class GeonameStateEntity {
    @PrimaryColumn({ type: 'integer' })
    _id: number;

    @IsNotEmpty()
    @Column('text')
    stateName: string;

    @Length(2, 2)
    @IsNotEmpty()
    @Column('text')
    stateAcronym: string;

    @CreateDateColumn('timestamp')
    createAt: Date;

    @CreateDateColumn('timestamp')
    updateAt: Date;
}
