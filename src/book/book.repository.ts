import { Inject } from '@nestjs/common';
import { Book } from './book.entity';
import { QueryBooksDto } from './dto/query-books.dto';
import { Sequelize } from 'sequelize-typescript';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findByid(bookId: number): Promise<Book | null>;
}

export class SequelizeBookRepository implements BookRepository {
  constructor(
    @Inject()
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(queryBooksDto: QueryBooksDto): Promise<Book[] | null> {
    const { categoryId, recentDays, listNum, page } = queryBooksDto;

    const result = await this.sequelize.transaction(async (t) => {
      let condition = {};

      if (categoryId > 0) {
        condition = {
          ...condition,
          category_id: categoryId
        };
      }

      if (recentDays > 0) {
        condition = {
          ...condition,
          pub_date: {
            [Op.between]: [
              new Date(Date.now() - recentDays * 24 * 60 * 60 * 1000),
              Date.now()
            ]
          }
        };
      }
  
      const books = await this.sequelize.model('book').findAll({
        attributes: {
          include: [
            [this.sequelize.col('category.name'), 'category_name'],
          ]
        },
        include: [
          {
            model: this.sequelize.model
            required: false,
            attributes: [],
            as: 'category'
          }
        ],
        where: {
          ...condition
        },
        limit: +listNum,
        offset: (page - 1) * (listNum),
        transaction: t,
        subQuery: false
      });
  
      const totalBooks = await models.book.count({ transaction: t });
  
      return {
        books: books,
        pagination: {
          totalBooks: totalBooks,
          listNum: listNum,
          currentPage: page,
        }
      };
    });
    return result;
  }
  findByid(bookId: number): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  
}