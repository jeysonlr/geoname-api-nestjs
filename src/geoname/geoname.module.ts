import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringFormatterHelper } from './../shared/helper';
import { GeonameController } from './controllers/geoname.controller';
import { GeonameCityService, GeonameStateService } from './services';
import { GeonameCityRepository, GeonameStateRepository } from './repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GeonameStateRepository,
            GeonameCityRepository,
        ], 'databaseConnection'),
    ],
    providers: [
        StringFormatterHelper,
        GeonameStateService,
        GeonameCityService,
    ],
    controllers: [
        GeonameController
    ],
})
export class GeonameModule { }
