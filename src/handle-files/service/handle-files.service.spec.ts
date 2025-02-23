import { Test, TestingModule } from '@nestjs/testing';
import { HandleFilesService } from './handle-files.service';

describe('HandleFilesService', () => {
  let service: HandleFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandleFilesService],
    }).compile();

    service = module.get<HandleFilesService>(HandleFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
