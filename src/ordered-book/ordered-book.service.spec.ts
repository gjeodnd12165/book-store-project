import { Test, TestingModule } from '@nestjs/testing';
import { OrderedBookService } from './ordered-book.service';

describe('OrderedBookService', () => {
  let service: OrderedBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderedBookService],
    }).compile();

    service = module.get<OrderedBookService>(OrderedBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
