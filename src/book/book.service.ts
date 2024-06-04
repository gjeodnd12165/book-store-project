import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Sequelize } from 'sequelize-typescript';
import { Book } from './book.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { GetBooksParamDto } from './dto/get-books.dto.';

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

  async findAll(getBooksParamDto: GetBooksParamDto): Promise<Book[] | null> {
    const {  } = getBooksParamDto
    
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
  
      const books = await this.bookModel.findAll({
        attributes: {
          include: [
            [this.sequelize.col('category.name'), 'category_name'],
          ]
        },
        include: [
          {
            model: model.category,
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
