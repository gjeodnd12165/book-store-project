import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface DeliveryAttributes {
  id?: number;
  address: string;
  receiver: string;
  contact: string;
}

@Table({ tableName: 'delivery', timestamps: false })
export class Delivery
  extends Model<DeliveryAttributes, DeliveryAttributes>
  implements DeliveryAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(500) })
  address!: string;

  @Column({ type: DataType.STRING(45) })
  receiver!: string;

  @Column({ type: DataType.STRING(45) })
  contact!: string;
}
