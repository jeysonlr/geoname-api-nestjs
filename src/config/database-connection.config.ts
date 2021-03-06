import { DatabaseType } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

type PostgresType = 'postgres';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class DatabaseTypeOrmConfig
 * @implements {TypeOrmOptionsFactory}
 */
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
            synchronize: true,  // ao rodar a primeira vez deixar essa linha descomentada para criar as tabelas no banco
            autoLoadEntities: true,
        };
    }
}
