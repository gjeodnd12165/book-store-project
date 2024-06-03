import { Op, Transaction, WhereOptions } from 'sequelize';
import { bookAttributes, initModels } from '../models/init-models';
import { sequelize } from '../sequelize';
import { Literal } from 'sequelize/types/utils';
import { IdNotConvertableError } from '../errors';

const models = initModels(sequelize);


/**
 * @returns information of found book
 */
export async function searchBooks(
  categoryId: string | undefined, 
  recentDays: string | undefined, 
  listNum: string | undefined = '20', 
  page: string | undefined = '1'
) {
  // if (
  //   isNaN(Number(categoryId)) ||
  //   isNaN(Number(recentDays)) ||
  //   isNaN(Number(listNum)) ||
  //   isNaN(Number(page))
  // ) {
  //   throw new IdNotConvertableError('categoryId, recentDays, listNum, page should be able to be casted to a number');
  // }

  const result = await sequelize.transaction(async (t: Transaction) => {
    let condition = {};
    
    if (categoryId) {
      condition = {
        ...condition,
        category_id: +categoryId
      };
    }
    if (recentDays) {
      condition = {
        ...condition,
        pub_date: {
          [Op.between]: [
            new Date(Date.now() - +recentDays * 24 * 60 * 60 * 1000),
            Date.now()
          ]
        }
      };
    }

    const books = await models.book.findAll({
      attributes: {
        include: [
          [sequelize.col('category.name'), 'category_name'],
        ]
      },
      include: [
        {
          model: models.category,
          required: false,
          attributes: [],
          as: 'category'
        }
      ],
      where: {
        ...condition
      },
      limit: +listNum,
      offset: (+page - 1) * (+listNum),
      transaction: t,
      subQuery: false
    });

    const totalBooks = await models.book.count({ transaction: t });

    return {
      books: books,
      pagination: {
        totalBooks: totalBooks,
        listNum: +listNum,
        currentPage: +page,
      }
    };
  });
  return result;
}

/**
 * @returns information of found book
 */
export async function searchBook(
  bookId: string, 
  userId: string | undefined
): Promise<bookAttributes> {
  if (isNaN(Number(bookId))) {
    throw new IdNotConvertableError('bookId should be able to be casted to a number');
  }
  
  const result = await sequelize.transaction(async (t: Transaction) => {

    let condition: WhereOptions<bookAttributes> = {
      id: +bookId
    };

    let isLiked: [Literal, string] | null;
    if (userId) {
      isLiked = [
        sequelize.literal(`EXISTS (SELECT * FROM \`like\` WHERE user_id=${+userId} AND book_id=${+bookId})`),
        'isLiked'
      ]
    }

    const book = await models.book.findOne({
      include: [
        {
          model: models.category,
          required: false,
          attributes: [],
          as: 'category'
        }
      ],
      attributes: {
        include:[
          [
            sequelize.col('category.name'), 'category_name'
          ],
          [
            sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE `like`.book_id = book.id)'),
            'like'
          ],
          isLiked
        ]
      },
      where: {
        ...condition
      },
      transaction: t,
    });

    return book;
  });
  return result;
}