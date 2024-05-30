import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface CategoryAttributes {
  id: number;
  name: string;
}

@Table({ tableName: 'category', timestamps: false })
export class Category
  extends Model<CategoryAttributes, CategoryAttributes>
  implements CategoryAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.STRING(100) })
  @Index({ name: 'name_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  name!: string;
}
