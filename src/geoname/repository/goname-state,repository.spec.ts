import { GeonameStateEntity } from '../entity';
import { GeonameStateRepository } from './geoname-state.repository';
import { Test, TestingModule } from "@nestjs/testing";

describe('GeonameStateRepository', () => {
    let repository;
    let mockData;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeonameStateRepository],
        }).compile();

        repository = module.get<GeonameStateRepository>(GeonameStateRepository);
        mockData = { stateName: 'PARANA', stateAcronym: 'PR' } as GeonameStateEntity;
        repository.save = jest.fn();
        repository.delete = jest.fn();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getCurrency()', () => {
        it('should be called findOne with correct params', async () => {
            repository.findOne = jest.fn().mockReturnValue({});
            await repository.getCurrency('USD');
            expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
        });

        it('should be throw findOne returns empty', async () => {
            repository.findOne = jest.fn().mockReturnValue(undefined);
            await expect(repository.getCurrency('USD')).rejects.toThrow(
                new NotFoundException(`The currency USD not found.`),
            );
        });

        it('should be returns when findOne returns', async () => {
            repository.findOne = jest.fn().mockReturnValue(mockData);
            expect(await repository.getCurrency('USD')).toEqual(mockData);
        });
    });
});
