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
  Id?: number;
  DeliveryId: number;
  UserId: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

@Table({ tableName: 'orders', timestamps: false })
export class Order
  extends Model<OrderAttributes, OrderAttributes>
  implements OrderAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'delivery_id', type: DataType.INTEGER })
  @Index({
    name: 'orders_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  DeliveryId!: number;

  @Column({ field: 'user_id', type: DataType.INTEGER })
  @Index({
    name: 'orders_user_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  UserId!: number;

  @Column({ field: 'created_at', type: DataType.DATE })
  CreatedAt!: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  UpdatedAt!: Date;
}
