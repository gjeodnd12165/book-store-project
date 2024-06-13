import { Injectable } from '@nestjs/common';
import {
  FetchBookRequestBodyDto,
  FetchBookRequestParamDto,
  FetchDetailedBookResponseDto,
  FetchBooksRequestQueryDto,
  FetchBookResponseDto,
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
    queryBooksRequestQueryDto: FetchBooksRequestQueryDto,
  ): Promise<FetchDetailedBookResponseDto[]> {
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

      console.log(books);
      console.log('=======================');

      const transformedBooks = plainToInstance(FetchBookResponseDto, books, {
        excludeExtraneousValues: true,
      });

      console.log(transformedBooks);

      return transformedBooks;
    });
  }

  findOne(
    fetchBookRequestParamDto: FetchBookRequestParamDto,
    fetchBookRequestBodyDto: FetchBookRequestBodyDto,
  ): Promise<FetchDetailedBookResponseDto> {
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
