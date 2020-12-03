import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseTypeOrmConfig } from './config';
import { GeonameModule } from './geoname/geoname.module';

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
        GeonameModule,
    ],
    exports: [
        ConfigModule,
    ]
})
export class AppModule { }
