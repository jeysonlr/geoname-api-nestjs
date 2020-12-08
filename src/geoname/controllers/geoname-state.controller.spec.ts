import { Test, TestingModule } from '@nestjs/testing';
import { GeonameStateController } from './geoname-state.controller';

describe('GeonameStateController', () => {
  let controller: GeonameStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeonameStateController],
    }).compile();

    controller = module.get<GeonameStateController>(GeonameStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
