import { Test, TestingModule } from '@nestjs/testing';
import { KenelService } from './kenel.service';

describe('KenelService', () => {
  let service: KenelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KenelService],
    }).compile();

    service = module.get<KenelService>(KenelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
