import { Test, TestingModule } from '@nestjs/testing';
import { TypeBilletController } from './type-billet.controller';
import { TypeBilletService } from './type-billet.service';

describe('TypeBilletController', () => {
  let controller: TypeBilletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeBilletController],
      providers: [TypeBilletService],
    }).compile();

    controller = module.get<TypeBilletController>(TypeBilletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
