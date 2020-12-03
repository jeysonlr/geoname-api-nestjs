// import { StringFormatterHelper } from './../../shared/helper';
// import { GeonameStateEntity } from '../entity';
// import { GeonameStateRepository } from './geoname-state.repository';
// import { Test, TestingModule } from "@nestjs/testing";

// describe('GeonameStateRepository', () => {
//     let repository;
//     let mockData;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [GeonameStateRepository],
//         }).compile();

//         repository = module.get<GeonameStateRepository>(GeonameStateRepository);
//         mockData = { stateName: 'PARANA', stateAcronym: 'PR' } as GeonameStateEntity;
//         repository.save = jest.fn();
//     });

//     it('should be defined', () => {
//         expect(repository).toBeDefined();
//     });

//     // describe('createState()', () => {
//     //     it('garantindo que esteja sendo chamado o metodo com os parametros corretos', async () => {
//     //         repository.save = jest.fn().mockReturnValue(mockData);
//     //         await repository.createState(mockData);
//     //         expect(repository.save).toBeCalledWith(mockData)
//     //     });
//     // });
// });
