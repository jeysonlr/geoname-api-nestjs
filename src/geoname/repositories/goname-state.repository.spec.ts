import { StringFormatterHelper } from './../../shared/helper';
import { GeonameStateEntity } from '../entities';
import { GeonameStateRepository } from './geoname-state.repository';
import { Test, TestingModule } from "@nestjs/testing";
import { CreateOrUpdateStateGeonameDto } from '../dto';
import { StateDatabaseErrorException } from '../exceptions';
import { ERROR_MESSAGES } from '../constants';

describe('GeonameStateRepository', () => {
    let repository;
    let mockDataEntity;
    let mockDataDTO;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeonameStateRepository, StringFormatterHelper],
        }).compile();

        repository = module.get<GeonameStateRepository>(GeonameStateRepository);
        mockDataEntity = { stateName: 'PARANA', stateAcronym: 'PR' } as GeonameStateEntity;
        mockDataDTO = { stateName: 'PARANA', stateAcronym: 'PR' } as CreateOrUpdateStateGeonameDto;
        repository.save = jest.fn();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createState()', () => {
        it('garantindo que esteja sendo chamado o metodo com os parametros corretos', async () => {
            repository.save = jest.fn().mockReturnValue(mockDataDTO);
            await repository.createState(mockDataDTO);
            expect(repository.save).toBeCalledWith(mockDataDTO)
        });

        it('garantindo que retorne excessao personalizada', async () => {
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.createState(mockDataDTO)).rejects.toThrow();
        });

        it('garantindo que quebre o teste passando parametros de entrada inválidos, stateName', async () => {
            mockDataDTO.stateName = 'INVALID';
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.createState(mockDataDTO)).rejects.toThrow();
        });

        it('garantindo que quebre o teste passando parametros de entrada inválidos, stateAcronym', async () => {
            mockDataDTO.stateAcronym = 'INVALID';
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.createState(mockDataDTO)).rejects.toThrow();
        });

        // it('garantindo que retorne o valor igual ao que foi passado por parametro', async () => {
        //     expect(await repository.createState(mockDataDTO)).toEqual(mockDataDTO);
        // });
    });

    describe('updateState()', () => {
        it('garantindo que esteja sendo chamado o metodo com os parametros corretos', async () => {
            repository.save = jest.fn().mockReturnValue(mockDataDTO);
            await repository.updateState(mockDataDTO);
            expect(repository.save).toBeCalledWith(mockDataDTO)
        });

        it('garantindo que retorne excessao personalizada', async () => {
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.updateState(mockDataDTO)).rejects.toThrow();
        });

        it('garantindo que quebre o teste passando parametros de entrada inválidos, stateName', async () => {
            mockDataDTO.stateName = 'INVALID';
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.updateState(mockDataDTO)).rejects.toThrow();
        });

        it('garantindo que quebre o teste passando parametros de entrada inválidos, stateAcronym', async () => {
            mockDataDTO.stateAcronym = 'INVALID';
            repository.save = jest.fn().mockRejectedValue(
                new StateDatabaseErrorException(ERROR_MESSAGES.STATE_SAVE_DATABASE_ERROR)
            );
            await expect(repository.updateState(mockDataDTO)).rejects.toThrow();
        });

        // it('garantindo que retorne o valor igual ao que foi passado por parametro', async () => {
        //     expect(await repository.updateState(mockDataEntity)).toEqual(mockDataDTO);
        // });
    });
});
