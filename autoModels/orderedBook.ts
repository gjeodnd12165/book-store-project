import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface orderedBookAttributes {
  id?: number;
  orderId: number;
  bookId: number;
  quantity: number;
}

@Table({ tableName: 'orderedBook', timestamps: false })
export class orderedBook
  extends Model<orderedBookAttributes, orderedBookAttributes>
  implements orderedBookAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ field: 'order_id', type: DataType.INTEGER })
  @Index({
    name: 'orderedBooks_order_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  orderId!: number;

  @Column({ field: 'book_id', type: DataType.INTEGER })
  @Index({
    name: 'orderedBooks_user_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  bookId!: number;

  @Column({ type: DataType.INTEGER })
  quantity!: number;
}
