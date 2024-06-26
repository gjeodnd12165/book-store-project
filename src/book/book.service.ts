import { Injectable } from '@nestjs/common';
import {
  FetchBookRequestBodyDto,
  FetchBookRequestParamDto,
  FetchDetailedBookResponseDto,
  FetchBooksRequestQueryDto,
  FetchBooksResponseDto,
} from './dto/fetch-book.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './book.entity';
import { Op, Transaction, WhereOptions } from 'sequelize';
import { Category } from 'src/category/category.entity';
import { Col, Literal } from 'sequelize/types/utils';
import sequelize from 'sequelize';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  findAll(
    categoryId: number,
    recentDays: number,
    listNum: number,
    page: number,
  ): Promise<FetchBooksResponseDto> {
    return this.sequelize.transaction(async (t: Transaction) => {
      let condition = {};

      if (categoryId) {
        condition = {
          ...condition,
          category_id: categoryId,
        };
      }
      if (recentDays) {
        condition = {
          ...condition,
          pub_date: {
            [Op.between]: [
              new Date(Date.now() - recentDays * 24 * 60 * 60 * 1000),
              Date.now(),
            ],
          },
        };
      }

      const books: Book[] = await this.bookModel.findAll({
        attributes: {
          include: [[this.sequelize.col('category.name'), 'category_name']],
        },
        include: [
          {
            model: this.categoryModel,
            required: false,
            attributes: [],
            as: 'category',
          },
        ],
        where: {
          ...condition,
        },
        limit: listNum,
        offset: (page - 1) * listNum,
        transaction: t,
        subQuery: false,
      });

      return {
        books: books,
        pagination: {
          totalBooks: books.length,
          listNum: listNum,
          currentPage: page,
        },
      };
    });
  }

  findOne(
    bookId: number,
    userId: number,
  ): Promise<FetchDetailedBookResponseDto> {
    return this.sequelize.transaction(async (t: Transaction) => {
      const condition: WhereOptions<Book> = {
        id: bookId,
      };

      const including: (string | [Col | Literal, string])[] = [
        [sequelize.col('category.name'), 'category_name'],
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM `like` WHERE `like`.book_id = book.id)',
          ),
          'likes',
        ],
      ];

      if (userId) {
        including.push([
          sequelize.literal(
            `EXISTS (SELECT * FROM \`like\` WHERE user_id=${+userId} AND book_id=${+bookId})`,
          ),
          'liked',
        ]);
      }

      const book = await this.bookModel.findOne({
        include: [
          {
            model: this.categoryModel,
            required: false,
            attributes: [],
            as: 'category',
          },
        ],
        attributes: {
          include: including,
        },
        where: {
          ...condition,
        },
        transaction: t,
      });

      return plainToInstance(FetchDetailedBookResponseDto, book);
    });
  }
}
