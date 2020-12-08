import { GeonameStateEntity } from '../entities';
import { GeonameStateService } from '../services';
import { ValidationPipe } from '../../shared/pipes';
import { CreateOrUpdateStateGeonameDto } from '../dto';
import { SUCCESS_MESSAGES, ROUTES } from '../constants';
import { CreatedResponseDataDto, OkResponseDataDto } from '../../shared/dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';

/**
 * @author Jeyson Luiz Romualdo
 * @export
 * @class GeonameStateController
 */
@Controller(ROUTES.STATE)
export class GeonameStateController {
    constructor(
        private readonly geonameStateService: GeonameStateService
    ) { }

    @Get()
    async getAll() {
        const geonameStates = await this.geonameStateService.findAll();
        return new OkResponseDataDto<GeonameStateEntity[]>(
            SUCCESS_MESSAGES.GET_SUCCESS, geonameStates
        )
    }

    @UsePipes(ValidationPipe)
    @Get(':stateId')
    async getById(
        @Param('stateId', ParseIntPipe) stateId: number) {
        const result = await this.geonameStateService.findById(stateId);
        return new OkResponseDataDto<GeonameStateEntity>(SUCCESS_MESSAGES.GET_SUCCESS, result);
    }

    @Post()
    async createState(
        @Body() data: CreateOrUpdateStateGeonameDto) {
        const result = await this.geonameStateService.createState(data);
        return new CreatedResponseDataDto<CreateOrUpdateStateGeonameDto>(
            SUCCESS_MESSAGES.CREATE_STATE_SUCCESS, result
        );
    }

    @UsePipes(ValidationPipe)
    @Put(':stateId')
    async updateState(
        @Param('stateId', ParseIntPipe) stateId: number,
        @Body() data: CreateOrUpdateStateGeonameDto) {
        const result = await this.geonameStateService.updateState(stateId, data);
        return new CreatedResponseDataDto<CreateOrUpdateStateGeonameDto>(
            SUCCESS_MESSAGES.UPDATE_STATE_SUCCESS, result
        );
    }
}