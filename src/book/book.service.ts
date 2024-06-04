import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { QueryBooksDto } from './dto/query-books.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { Literal } from 'sequelize/types/utils';
import { Book } from './book.entity';
import { Category } from 'src/category/entities/category.entity';
import { SequelizeBookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(
    @Inject()
    private readonly bookRepository: SequelizeBookRepository,
  ) {}

  async findAll(queryBooksDto: QueryBooksDto): Promise<Book[] | null> {
    return this.bookRepository.findAll(queryBooksDto);
  }

  async findOne(queryBookDto: QueryBookDto): Promise<Book>{
    const { bookId, userId } = queryBookDto;

    return await this.sequelize.transaction(async (t) => {
      let condition: WhereOptions<Book> = {
        id: bookId,
      };

      const includings: (string | [Col | Literal, string])[] = [
        [this.sequelize.col('category.name'), 'category_name'],
        [
          this.sequelize.literal(
            '(SELECT COUNT(*) FROM `like` WHERE `like`.book_id = book.id)',
          ),
          'likes',
        ],
      ];

      if (userId) {
        includings.push([
          this.sequelize.literal(
            `EXISTS (SELECT * FROM \`like\` WHERE user_id=${userId} AND book_id=${bookId})`,
          ),
          'liked',
        ]);
      }

      const book: Book = await this.bookModel.findOne({
        include: [
          {
            model: 
          }
        ]
      })
    });
  }
}
