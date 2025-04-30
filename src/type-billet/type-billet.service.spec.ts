import { Test, TestingModule } from '@nestjs/testing';
import { TypeBilletService } from './type-billet.service';

describe('TypeBilletService', () => {
  let service: TypeBilletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeBilletService],
    }).compile();

    service = module.get<TypeBilletService>(TypeBilletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
