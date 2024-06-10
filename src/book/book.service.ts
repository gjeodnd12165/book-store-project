import { Injectable } from '@nestjs/common';
import {
  FetchBookRequestParamDto,
  FetchBookResponseDto,
  FetchBooksRequestQueryDto,
  FetchBooksResponseDto,
} from './dto/fetch-book.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './book.entity';
import { Op, Transaction } from 'sequelize';
import { Category } from 'src/category/category.entity';

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
          category_id: +categoryId,
        };
      }
      if (recentDays) {
        condition = {
          ...condition,
          pub_date: {
            [Op.between]: [
              new Date(Date.now() - +recentDays * 24 * 60 * 60 * 1000),
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
        limit: +listNum,
        offset: (+page - 1) * +listNum,
        transaction: t,
        subQuery: false,
      });

      return books.map((book) => new FetchBooksResponseDto(book));
    });
  }

  findOne(
    queryBookRequestParamDto: FetchBookRequestParamDto,
  ): Promise<FetchBookResponseDto> {
    console.log(queryBookRequestParamDto);
    return;
  }
}
