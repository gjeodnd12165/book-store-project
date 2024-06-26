import { Book } from '@app/book/book.entity';
import { User } from '@app/user/user.entity';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'cartItem', timestamps: false })
export class CartItem extends Model<CartItem> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.INTEGER })
  readonly quantity: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Book)
  readonly book_id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  readonly user_id: number;

  @BelongsTo(() => Book)
  readonly book: Book;

  @BelongsTo(() => User)
  readonly user: User;
}
