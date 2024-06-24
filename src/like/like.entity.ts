import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'like', createdAt: false, updatedAt: false })
export class Like extends Model<Like> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  @ForeignKey(() => User)
  user_id: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  @ForeignKey(() => Book)
  book_id: number;

  @BelongsTo(() => User)
  readonly user: User;

  @BelongsTo(() => Book)
  readonly book: Book;
}
