import { Test, TestingModule } from '@nestjs/testing';
import { ChallengerController } from './challenger.controller';

describe('ChallengerController', () => {
  let controller: ChallengerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengerController],
    }).compile();

    controller = module.get<ChallengerController>(ChallengerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
