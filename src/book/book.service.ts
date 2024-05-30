import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './book.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
    private readonly sequelize: Sequelize,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll(): Promise<Book[] | null> {
    return await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };

      return await this.bookModel.findAll({
        ...transactionHost,
      });
    });
  }

  async findOne(id: number): Promise<Book | null>{
    return await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };

      return await this.bookModel.findOne({
        where: {
          id: id,
        },
        ...transactionHost,
      });
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
