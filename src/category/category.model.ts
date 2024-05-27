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
  Id: number;
  Name: string;
}

@Table({ tableName: 'categories', timestamps: false })
export class Category
  extends Model<CategoryAttributes, CategoryAttributes>
  implements CategoryAttributes
{
  @Column({ field: 'id', primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id!: number;

  @Column({ field: 'name', type: DataType.STRING(100) })
  @Index({ name: 'name_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  Name!: string;
}
