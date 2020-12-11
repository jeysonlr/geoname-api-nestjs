import { TypeOrmModule } from '@nestjs/typeorm';
import { PopulateStatesService } from './services';
import { HttpModule, Module } from '@nestjs/common';
import { PopulateStateController } from './controllers';
import { StringFormatterHelper } from './../shared/helper';
import { GeonameCityService, GeonameStateService } from 'src/geoname/services';
import { GeonameCityRepository, GeonameStateRepository } from 'src/geoname/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GeonameStateRepository,
            GeonameCityRepository,
        ], 'databaseConnection'),
        HttpModule,
    ],
    providers: [
        GeonameCityService,
        GeonameStateService,
        StringFormatterHelper,
        PopulateStatesService,
    ],
    controllers: [
        PopulateStateController
    ],
    exports: [
        HttpModule,
    ],
})
export class PopulateGeonameModule { }
