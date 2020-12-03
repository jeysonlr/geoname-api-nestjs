import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeonameStateService } from './services';
import { GeonameStateRepository } from './repositories';
import { StringFormatterHelper } from './../shared/helper';
import { GeonameController } from './controllers/geoname.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([GeonameStateRepository], 'databaseConnection'),
    ],
    providers: [
        StringFormatterHelper,
        GeonameStateService
    ],
    controllers: [
        GeonameController
    ],
})
export class GeonameModule { }
