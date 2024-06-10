import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';

@Table({ tableName: 'category', createdAt: false, updatedAt: false })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING(100) })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly name: string;

  @HasMany(() => Book, 'category_id')
  readonly books: Book[];
}
