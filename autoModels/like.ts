import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface likeAttributes {
  userId: number;
  bookId: number;
}

@Table({ tableName: 'like', timestamps: false })
export class like
  extends Model<likeAttributes, likeAttributes>
  implements likeAttributes
{
  @Column({ field: 'user_id', primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  @Index({ name: 'user_id_idx', using: 'BTREE', order: 'ASC', unique: false })
  userId!: number;

  @Column({ field: 'book_id', primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  @Index({ name: 'book_id_idx', using: 'BTREE', order: 'ASC', unique: false })
  bookId!: number;
}
