import { Test, TestingModule } from '@nestjs/testing';
import { OrderedBookController } from './ordered-book.controller';
import { OrderedBookService } from './ordered-book.service';

describe('OrderedBookController', () => {
  let controller: OrderedBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderedBookController],
      providers: [OrderedBookService],
    }).compile();

    controller = module.get<OrderedBookController>(OrderedBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
