import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface CartItemAttributes {
  id?: number;
  bookId: number;
  userId: number;
  quantity: number;
}

@Table({ tableName: 'cartItem', timestamps: false })
export class CartItem
  extends Model<CartItemAttributes, CartItemAttributes>
  implements CartItemAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ field: 'book_id', type: DataType.INTEGER })
  @Index({
    name: 'cartItems_book_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  bookId!: number;

  @Column({ field: 'user_id', type: DataType.INTEGER })
  @Index({
    name: 'cartItems_user_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  userId!: number;

  @Column({ type: DataType.INTEGER })
  quantity!: number;
}
