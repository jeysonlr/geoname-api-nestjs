import { GeonameCityEntity } from '../entities';
import { GeonameCityService } from '../services';
import { ValidationPipe } from './../../shared/pipes';
import { CreateOrUpdateCityGeonameDto } from '../dto';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Controller, Get, Param, UsePipes, ParseIntPipe, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import {
    OkResponseDataDto,
    CreatedResponseDataDto,
} from './../../shared/dto';

@Controller(ROUTES.CITY)
export class GeonameCityController {
    constructor(
        private readonly geonameCityService: GeonameCityService
    ) { }

    @Get()
    async getAll() {
        const geonameCitys = await this.geonameCityService.findAll();
        return new OkResponseDataDto<GeonameCityEntity[]>(
            SUCCESS_MESSAGES.GET_SUCCESS, geonameCitys
        );
    }

    @UsePipes(ValidationPipe)
    @Get(':cityId')
    async getById(
        @Param('cityId', ParseIntPipe) cityId: number) {
        const result = await this.geonameCityService.findById(cityId);
        return new OkResponseDataDto<GeonameCityEntity>(SUCCESS_MESSAGES.GET_SUCCESS, result);
    }

    @Post()
    async createCity(
        @Body() data: CreateOrUpdateCityGeonameDto) {
        const result = await this.geonameCityService.createCity(data);
        return new CreatedResponseDataDto<CreateOrUpdateCityGeonameDto>(
            SUCCESS_MESSAGES.CREATE_CITY_SUCCESS, result
        );
    }

    @UsePipes(ValidationPipe)
    @Put(':cityId')
    async updateCity(
        @Param('cityId', ParseIntPipe) cityId: number,
        @Body() data: CreateOrUpdateCityGeonameDto) {
        const result = await this.geonameCityService.updateCity(cityId, data);
        return new CreatedResponseDataDto<CreateOrUpdateCityGeonameDto>(
            SUCCESS_MESSAGES.UPDATE_CITY_SUCCESS, result
        );
    }

    @Delete(':cityId')
    @HttpCode(204)
    async deleteCity(@Param('cityId', ParseIntPipe) cityId: number) {
        await this.geonameCityService.deleteCity(cityId);
    }
}
