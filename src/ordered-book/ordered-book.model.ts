import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface OrderedBookAttributes {
  Id?: number;
  OrderId: number;
  BookId: number;
  Quantity: number;
}

@Table({ tableName: 'orderedBooks', timestamps: false })
export class OrderedBook
  extends Model<OrderedBookAttributes, OrderedBookAttributes>
  implements OrderedBookAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'order_id', type: DataType.INTEGER })
  @Index({
    name: 'orderedBooks_order_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  OrderId!: number;

  @Column({ field: 'book_id', type: DataType.INTEGER })
  @Index({
    name: 'orderedBooks_user_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  BookId!: number;

  @Column({ field: 'quantity', type: DataType.INTEGER })
  Quantity!: number;
}
