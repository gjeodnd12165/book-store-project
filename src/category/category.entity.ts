import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'category' })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING(100) })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly name: string;
}
