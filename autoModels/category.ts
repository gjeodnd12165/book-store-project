import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface categoryAttributes {
  id: number;
  name: string;
}

@Table({ tableName: 'category', timestamps: false })
export class category
  extends Model<categoryAttributes, categoryAttributes>
  implements categoryAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.STRING(100) })
  @Index({ name: 'name_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  name!: string;
}
