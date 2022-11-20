import { Test, TestingModule } from '@nestjs/testing';
import { Tus } from './tus';

describe('Tus', () => {
  let provider: Tus;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({providers: [Tus]})
      .compile();

    provider = module.get<Tus>(Tus);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
