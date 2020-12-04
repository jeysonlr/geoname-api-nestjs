import { DatabaseType } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

type PostgresType = 'postgres';

@Injectable()
export class DatabaseTypeOrmConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE as (DatabaseType & PostgresType),
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
            // synchronize: true,
            autoLoadEntities: true,
        };
    }
}
