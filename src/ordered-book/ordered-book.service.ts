import { Injectable } from '@nestjs/common';
import { CreateOrderedBookDto } from './dto/create-ordered-book.dto';
import { UpdateOrderedBookDto } from './dto/update-ordered-book.dto';

@Injectable()
export class OrderedBookService {
  create(createOrderedBookDto: CreateOrderedBookDto) {
    return 'This action adds a new orderedBook';
  }

  findAll() {
    return `This action returns all orderedBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderedBook`;
  }

  update(id: number, updateOrderedBookDto: UpdateOrderedBookDto) {
    return `This action updates a #${id} orderedBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderedBook`;
  }
}
