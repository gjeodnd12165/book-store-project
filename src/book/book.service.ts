import { Injectable } from '@nestjs/common';
import {
  FetchBookRequestBodyDto,
  FetchBookRequestParamDto,
  FetchBookResponseDto,
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

@Injectable()
export class BookService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Book)
    private readonly BookModel: typeof Book,
    @InjectModel(Category)
    private readonly CategoryModel: typeof Category,
  ) {}

  findAll(
    queryBooksRequestQueryDto: FetchBooksRequestQueryDto,
  ): Promise<FetchBooksResponseDto[]> {
    const { categoryId, recentDays, listNum, page } = queryBooksRequestQueryDto;

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

      const books: Book[] = await this.BookModel.findAll({
        attributes: {
          include: [[this.sequelize.col('category.name'), 'category_name']],
        },
        include: [
          {
            model: this.CategoryModel,
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

      return books.map((book) => new FetchBooksResponseDto(book));
    });
  }

  findOne(
    fetchBookRequestParamDto: FetchBookRequestParamDto,
    fetchBookRequestBodyDto: FetchBookRequestBodyDto,
  ): Promise<FetchBookResponseDto> {
    return this.sequelize.transaction(async (t: Transaction) => {
      const { bookId } = fetchBookRequestParamDto;
      const { userId } = fetchBookRequestBodyDto;

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

      const book = await this.BookModel.findOne({
        include: [
          {
            model: this.CategoryModel,
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

      return new FetchBookResponseDto(book);
    });
  }
}
