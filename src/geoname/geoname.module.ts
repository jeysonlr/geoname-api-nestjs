import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeonameController } from './controller/geoname.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ], 'sabiumConnection'),
    ],
    controllers: [
        GeonameController
    ]
})
export class GeonameModule { }
