import { Test, TestingModule } from '@nestjs/testing';
import { ChallengerService } from './challenger.service';

describe('ChallengerService', () => {
  let service: ChallengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengerService],
    }).compile();

    service = module.get<ChallengerService>(ChallengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
