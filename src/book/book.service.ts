import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './book.model';

@Injectable()
export class BookService {
  constructor(
    private sequelize: Sequelize,
    private bookModel: Book,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all book`;
  }

  async findOne(id: number){
    return await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };

      await this.bookModel.$get(keyof Book)
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
