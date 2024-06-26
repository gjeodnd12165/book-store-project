import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Delivery } from './delivery.entity';
import { User } from '@app/user/user.entity';

@Table({ tableName: 'order' })
export class Order extends Model<Order> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Delivery)
  readonly delivery_id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  readonly user_id: number;

  @Column({ type: DataType.INTEGER })
  readonly createdAt: number;
}
