import { Injectable } from '@nestjs/common';
import { CartItem } from './cart-item.entity';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, Transaction, WhereOptions } from 'sequelize';
import { Book } from '@app/book/book.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(CartItem)
    private readonly cartItemModel: typeof CartItem
  ) {}
  
  create(
    bookId: number,
    quantity: number,
    userId: number,
  ): Promise<CartItem> {
    return this.sequelize.transaction((t: Transaction) => {
      return this.cartItemModel.create({
        book_id: bookId,
        quantity: quantity,
        user_id: userId
      },
      {
        transaction: t
      })
    });
  }

  findAll(
    cartItemIds: number[],
    userId: number,
  ): Promise<CartItem[]> {
    return this.sequelize.transaction(async (t: Transaction) => {
      let condition: WhereOptions<CartItem> = {
        user_id: userId
      };
  
      if (cartItemIds && cartItemIds.length) {
        condition = {
          ...condition,
          id: {
            [Op.in]: cartItemIds.map((id: number) => +id)
          }
        }
      }
  
      const cartItem = await this.cartItemModel.findAll({
        include: [
          {
            model: Book,
            required: false,
            attributes: [],
            as: 'book',
          }
        ],
        attributes: {
          include: [
            [this.sequelize.col('book.title'), 'title'],
            [this.sequelize.col('book.summary'), 'summary'],
            [this.sequelize.col('book.price'), 'price'],
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
  }

  delete(
    cartItemId: number,
    userId: number,
  ): Promise<number> {
    return this.sequelize.transaction(async (t: Transaction) => {
      return this.cartItemModel.destroy({
        where: {
          id: cartItemId,
          user_id: userId,
        },
        transaction: t
      });
    });
  }
}
