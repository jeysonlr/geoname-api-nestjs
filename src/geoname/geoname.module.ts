import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringFormatterHelper } from './../shared/helper';
import { GeonameCityService, GeonameStateService } from './services';
import { GeonameCityController, GeonameStateController } from './controllers';
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
        GeonameStateController,
        GeonameCityController,
    ],
})
export class GeonameModule { }
