import { Op, Transaction, WhereOptions } from 'sequelize';
import { cartItemAttributes, cartItemCreationAttributes, initModels } from '../models/init-models';
import { sequelize } from '../sequelize';
import { IdNotConvertableError } from '../errors';

const models = initModels(sequelize);


/**
 * @returns information about INSERT
 */
export async function insertCartItem (
  bookId: string, 
  quantity: string, 
  userId: string
): Promise<cartItemCreationAttributes> {
  if (
    isNaN(Number(bookId)) ||
    isNaN(Number(quantity)) ||
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('bookId, quantity, userId should be able to casted to a number');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const insertInfo = await models.cartItem.create({
      book_id: +bookId,
      quantity: +quantity,
      user_id: +userId
    }, {
      transaction: t
    });

    return insertInfo;
  });
  return result;
}

/**
 * @returns information of found cartItem
 */
export async function searchCartItems (
  cartItemIds: string[] | undefined,
  userId: string
): Promise<cartItemAttributes[]> {
  console.log(cartItemIds);
  if (
    cartItemIds?.filter((id: string) => isNaN(Number(id))).length ||
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('element of bookIds, userId should be able to be casted to a number');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    let condition: WhereOptions<cartItemAttributes> = {
      user_id: +userId
    };

    if (cartItemIds && cartItemIds.length) {
      condition = {
        ...condition,
        id: {
          [Op.in]: cartItemIds.map((id: string) => +id)
        }
      }
    }

    const cartItem = await models.cartItem.findAll({
      include: [
        {
          model: models.book,
          required: false,
          attributes: [],
          as: 'book',
        }
      ],
      attributes: {
        include: [
          [sequelize.col('book.title'), 'title'],
          [sequelize.col('book.summary'), 'summary'],
          [sequelize.col('book.price'), 'price'],
        ]
      },
      where: {
        ...condition
      },
      transaction: t
    });
    console.log('cartItem', cartItem);
    
    return cartItem;
  });
  return result;
}

/**
 * @returns number of deleted rows
 */
export async function deleteCartItem(
  cartItemId: string,
  userId: string
): Promise<number> {
  if (
    isNaN(Number(cartItemId)) ||
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('cartItemId, userId should be able to be cated to a number');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const deleteCount = await models.cartItem.destroy({
      where: {
        id: +cartItemId,
        user_id: +userId
      },
      transaction: t
    });
    
    return deleteCount;
  });
  return result;
}