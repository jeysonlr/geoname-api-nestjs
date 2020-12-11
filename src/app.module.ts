import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseTypeOrmConfig } from './config';
import { HttpModule, Module } from '@nestjs/common';
import { GeonameModule } from './geoname/geoname.module';
import { PopulateGeonameModule } from './populate-geoname/populate-geoname.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `env/.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseTypeOrmConfig,
            name: 'databaseConnection',
        }),
        HttpModule,
        GeonameModule,
        PopulateGeonameModule,
    ],
    exports: [
        HttpModule,
        ConfigModule,
        GeonameModule,
    ]
})
export class AppModule { }
