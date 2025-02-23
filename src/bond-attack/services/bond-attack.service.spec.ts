import { Test, TestingModule } from '@nestjs/testing';
import { BondAttackService } from './bond-attack.service';

describe('BondAttackService', () => {
  let service: BondAttackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BondAttackService],
    }).compile();

    service = module.get<BondAttackService>(BondAttackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
