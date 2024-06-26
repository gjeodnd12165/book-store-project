import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order } from './order.entity';
import { Transaction } from 'sequelize';
import { Delivery } from './delivery.entity';
import { OrderedBook } from '@app/order/ordered-book.entity';
import { CartItem } from '@app/cart-item/cart-item.entity';
import { Op } from 'sequelize';
import { Book } from '@app/book/book.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Delivery)
    private readonly deilveryModel: typeof Delivery,
    @InjectModel(CartItem)
    private readonly cartItemModel: typeof CartItem,
    @InjectModel(OrderedBook)
    private readonly orderedBookModel: typeof OrderedBook,
  ) {}

  async create(
    cartItemIds: number[],
    address: string,
    receiver: string,
    contact: string,
    userId: number,
  ) {
    return this.sequelize.transaction(async (t: Transaction) => {
      const createdDelivery = await this.deilveryModel.create(
        {
          address,
          receiver,
          contact,
        },
        {
          transaction: t,
        },
      );

      const createdOrder = await this.orderModel.create(
        {
          delivery_id: createdDelivery.id,
          user_id: userId,
        },
        {
          transaction: t,
        },
      );

      const cartItems = await this.cartItemModel.findAll({
        where: {
          id: {
            [Op.in]: cartItemIds,
          },
        },
        transaction: t,
      });

      const createdOrderedBook = await this.orderedBookModel.bulkCreate(
        cartItems.map((cartItem: CartItem) => ({
          id: cartItem.id,
          order_id: createdOrder.id,
          book_id: cartItem.book_id,
          quantity: cartItem.quantity,
        })),
        {
          transaction: t,
        },
      );

      const deleteCount = await this.cartItemModel.destroy({
        where: {
          id: {
            [Op.in]: cartItemIds,
          },
        },
        transaction: t,
      });

      return {
        created: createdOrderedBook,
        deletedRows: deleteCount,
      };
    });
  }

  findAll(userId: number): Promise<OrderedBook[]> {
    return this.sequelize.transaction(async (t: Transaction) => {
      return await this.orderedBookModel.findAll({
        attributes: [
          ['order_id', 'id'],
          [this.sequelize.fn('COUNT', this.sequelize.col('*')), 'totalTypes'],
          [
            this.sequelize.fn(
              'CONVERT',
              this.sequelize.fn(
                'SUM',
                this.sequelize.literal('book.price*orderedBook.quantity'),
              ),
              this.sequelize.literal('SIGNED'),
            ),
            'totalPrice',
          ],
          [
            this.sequelize.fn(
              'CONVERT',
              this.sequelize.fn('SUM', this.sequelize.col('quantity')),
              this.sequelize.literal('SIGNED'),
            ),
            'totalQuantity',
          ],
          [this.sequelize.col('book.title'), 'title'],
        ],
        include: [
          {
            model: Order,
            as: 'order',
            attributes: ['createdAt'],
            where: { user_id: userId },
            include: [
              {
                model: Delivery,
                as: 'delivery',
                attributes: ['address', 'receiver', 'contact'],
              },
            ],
          },
          {
            model: Book,
            as: 'book',
            attributes: [],
          },
        ],
        group: ['order_id'],
        transaction: t,
      });
    });
  }
}
