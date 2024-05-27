import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface bookAttributes {
  id?: number;
  title: string;
  img?: number;
  categoryId: number;
  form: string;
  author: string;
  isbn: string;
  pages: string;
  summary?: string;
  detail?: string;
  contents?: string;
  price: number;
  pubDate: string;
}

@Table({ tableName: 'book', timestamps: false })
export class book
  extends Model<bookAttributes, bookAttributes>
  implements bookAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(45) })
  title!: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  img?: number;

  @Column({ field: 'category_id', type: DataType.INTEGER })
  @Index({
    name: 'category_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  categoryId!: number;

  @Column({ type: DataType.STRING(45) })
  form!: string;

  @Column({ type: DataType.STRING(45) })
  author!: string;

  @Column({ type: DataType.STRING(45) })
  isbn!: string;

  @Column({ type: DataType.STRING(45) })
  pages!: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  summary?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  detail?: string;

  @Column({ allowNull: true, type: DataType.STRING(45) })
  contents?: string;

  @Column({ type: DataType.INTEGER })
  price!: number;

  @Column({ field: 'pub_date', type: DataType.DATEONLY })
  pubDate!: string;
}
