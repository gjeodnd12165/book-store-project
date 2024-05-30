import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface OrderAttributes {
  id?: number;
  deliveryId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'order', timestamps: false })
export class Order
  extends Model<OrderAttributes, OrderAttributes>
  implements OrderAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ field: 'delivery_id', type: DataType.INTEGER })
  @Index({
    name: 'orders_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  deliveryId!: number;

  @Column({ field: 'user_id', type: DataType.INTEGER })
  @Index({
    name: 'orders_user_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  userId!: number;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt!: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt!: Date;
}
