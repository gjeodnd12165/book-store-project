import { Op, Transaction } from 'sequelize';
import { cartItem, initModels, orderedBookAttributes, orderAttributes } from '../models/init-models';
import { sequelize } from '../sequelize';
import { IdNotConvertableError } from '../errors';

const models = initModels(sequelize);

/**
 * @returns information about INSERT
 */
export async function insertOrder(
  cartItemIds: number[], 
  delivery: {
    address: string,
    receiver: string,
    contact: string
  },
  userId: string
): Promise<{
  created: orderedBookAttributes[],
  deletedRows: number
}> {
  if (
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('element of bookIds, userId should be able to be casted to a number');
  }
  
  const result = await sequelize.transaction(async (t: Transaction) => {
    const createdDelivery = await models.delivery.create({
      address: delivery.address,
      receiver: delivery.receiver,
      contact: delivery.contact
    }, {
      transaction: t
    });

    const createdOrder = await models.order.create({
      delivery_id: createdDelivery.id,
      user_id: +userId
    }, {
      transaction: t
    });

    const cartItem = await models.cartItem.findAll({
      where: {
        id: {
          [Op.in]: cartItemIds
        }
      },
      transaction: t
    });

    const createdOrderedBook = await models.orderedBook.bulkCreate(
      cartItem.map((cartItem: cartItem) => ({
        id: cartItem.id,
        order_id: createdOrder.id,
        book_id: cartItem.book_id,
        quantity: cartItem.quantity
    })), {
      transaction: t
    });

    const deleteCount = await models.cartItem.destroy({
      where: {
        id: {
          [Op.in]: cartItemIds
        }
      },
      transaction: t
    });

    return {
      created: createdOrderedBook,
      deletedRows: deleteCount
    };
  });
  return result;
}

/**
 * @returns information of found order
 */
export async function searchOrders(
  userId: string
): Promise<orderedBookAttributes[]> {
  if (
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('userId should be able to be casted to a number');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const order = await models.orderedBook.findAll({
      attributes: [
        ['order_id', 'id'],
        [sequelize.fn('COUNT', sequelize.col('*')), 'totalTypes'],
        [sequelize.fn('CONVERT', sequelize.fn('SUM', sequelize.literal('book.price*orderedBook.quantity')), sequelize.literal('SIGNED')), 'totalPrice'],
        [sequelize.fn('CONVERT', sequelize.fn('SUM', sequelize.col('quantity')), sequelize.literal('SIGNED')), 'totalQuantity'],
        [sequelize.col('book.title'), 'title'],
      ],
      include: [
        {
          model: models.order,
          as: 'order',
          attributes: ['createdAt'],
          where: { user_id: userId },
          include: [
            {
              model: models.delivery,
              as: 'delivery',
              attributes: ['address', 'receiver', 'contact']
            }
          ]
        },
        {
          model: models.book,
          as: 'book',
          attributes: []
        }
      ],
      group: ['order_id'],
      transaction: t
    });
    return order;
  });
  return result;
}

/**
 * @returns detailed information of found order
 */
export async function searchOrder(
  orderId: string, 
  userId: string
): Promise<orderedBookAttributes[]> {
  if (
    isNaN(Number(orderId)) ||
    isNaN(Number(userId))
  ) {
    throw new IdNotConvertableError('orderId, userId should be able to be casted to a number');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const detailedOrder = await models.orderedBook.findAll({
      include: [
        {
          model: models.order,
          required: false,
          where: {
            user_id: userId
          },
          attributes: [
            ['user_id', 'userId']
          ],
          as: 'order'
        },
        {
          model: models.book,
          required: false,
          attributes: ['title', 'author', 'price'],
          as: 'book'
        }
      ],
      attributes: [
        ['book_id', 'bookId'],
         'quantity'
      ],
      where: {
        order_id: orderId,
      },
      transaction: t,
    });

    return detailedOrder;
  });
  return result;
}