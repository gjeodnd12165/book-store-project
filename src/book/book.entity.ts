import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.entity';

@Table({ tableName: 'book', timestamps: false })
export class Book extends Model<Book> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING(45) })
  readonly title: string;

  @Column({ type: DataType.INTEGER })
  readonly img: number;

  @Column({ type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  @ForeignKey(() => Category)
  readonly category_id: number;

  @Column({ type: DataType.STRING })
  readonly form: string;

  @Column({ type: DataType.STRING(45) })
  readonly author: string;

  @Column({ type: DataType.STRING })
  readonly isbn: string;

  @Column({ type: DataType.INTEGER })
  readonly pages: number;

  @Column({ type: DataType.STRING(500) })
  readonly summary: string;

  @Column({ type: DataType.STRING })
  readonly detail: string;

  @Column({ type: DataType.STRING(45) })
  readonly contents: string;

  @Column({ type: DataType.INTEGER })
  readonly price: number;

  @Column({ type: DataType.DATE })
  readonly pub_date: Date;

  @BelongsTo(() => Category)
  readonly category: Category;
}
