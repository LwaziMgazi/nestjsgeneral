import { Test, TestingModule } from '@nestjs/testing';
import { GiftRegisteryController } from './gift-registery.controller';

describe('GiftRegisteryController', () => {
  let controller: GiftRegisteryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftRegisteryController],
    }).compile();

    controller = module.get<GiftRegisteryController>(GiftRegisteryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
