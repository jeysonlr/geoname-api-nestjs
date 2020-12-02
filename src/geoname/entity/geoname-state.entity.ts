import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'geoname_estados', schema: 'public' })
export class GeonameStateEntity {
    @PrimaryColumn({ name: 'id', type: 'integer' })
    _id: number;

    @IsNotEmpty()
    @Column('text', { name: 'estadonome' })
    stateName: string;

    @Length(2, 2)
    @IsNotEmpty()
    @Column('text', { name: 'estadosigla' })
    stateAcronym: string;

    @Column('timestamp', { name: 'datacriacao' })
    createAt: Date;

    @Column('timestamp', { name: 'dataatualizacao' })
    updateAt: Date;
}
