import { Test, TestingModule } from '@nestjs/testing';
import { BondAttackController } from './bond-attack.controller';

describe('BondAttackController', () => {
  let controller: BondAttackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BondAttackController],
    }).compile();

    controller = module.get<BondAttackController>(BondAttackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
