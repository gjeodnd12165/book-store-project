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
  Id?: number;
  Address: string;
  Receiver: string;
  Contact: string;
}

@Table({ tableName: 'deliveries', timestamps: false })
export class Delivery
  extends Model<DeliveryAttributes, DeliveryAttributes>
  implements DeliveryAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'address', type: DataType.STRING(500) })
  Address!: string;

  @Column({ field: 'receiver', type: DataType.STRING(45) })
  Receiver!: string;

  @Column({ field: 'contact', type: DataType.STRING(45) })
  Contact!: string;
}
