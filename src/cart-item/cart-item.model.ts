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
  Id?: number;
  BookId: number;
  UserId: number;
  Quantity: number;
}

@Table({ tableName: 'cartItems', timestamps: false })
export class CartItem
  extends Model<CartItemAttributes, CartItemAttributes>
  implements CartItemAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'book_id', type: DataType.INTEGER })
  @Index({
    name: 'cartItems_book_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  BookId!: number;

  @Column({ field: 'user_id', type: DataType.INTEGER })
  @Index({
    name: 'cartItems_user_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  UserId!: number;

  @Column({ field: 'quantity', type: DataType.INTEGER })
  Quantity!: number;
}
