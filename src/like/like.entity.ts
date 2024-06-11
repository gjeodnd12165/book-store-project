import {
  BelongsTo,
  Column,
  DataType,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';

@Table({ tableName: 'like', createdAt: false, updatedAt: false })
export class Like extends Model<Like> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  user_id: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  book_id: number;

  // @BelongsTo(() => User)
  // user: User;

  @BelongsTo(() => Book)
  readonly book: Book;
}
