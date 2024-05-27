import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface LikeAttributes {
  UserId: number;
  BookId: number;
}

@Table({ tableName: 'likes', timestamps: false })
export class Like
  extends Model<LikeAttributes, LikeAttributes>
  implements LikeAttributes
{
  @Column({ field: 'user_id', primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  @Index({ name: 'user_id_idx', using: 'BTREE', order: 'ASC', unique: false })
  UserId!: number;

  @Column({ field: 'book_id', primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  @Index({ name: 'book_id_idx', using: 'BTREE', order: 'ASC', unique: false })
  BookId!: number;
}
