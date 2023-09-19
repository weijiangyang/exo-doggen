import { Test, TestingModule } from '@nestjs/testing';
import { KenelController } from './kenel.controller';

describe('KenelController', () => {
  let controller: KenelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KenelController],
    }).compile();

    controller = module.get<KenelController>(KenelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
