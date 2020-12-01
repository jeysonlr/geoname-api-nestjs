import { Test, TestingModule } from '@nestjs/testing';
import { GeonameController } from './geoname.controller';

describe('GeonameController', () => {
  let controller: GeonameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeonameController],
    }).compile();

    controller = module.get<GeonameController>(GeonameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
