import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'delivery' })
export class Delivery extends Model<Delivery> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING })
  readonly address: string;

  @Column({ type: DataType.STRING })
  readonly receiver: string;

  @Column({ type: DataType.STRING })
  readonly contact: string;
}
