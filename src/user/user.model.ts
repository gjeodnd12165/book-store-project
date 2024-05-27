import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface UserAttributes {
  Id?: number;
  Email: string;
  Username: string;
  Password: string;
  Salt: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User
  extends Model<UserAttributes, UserAttributes>
  implements UserAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'email', type: DataType.STRING(45) })
  @Index({ name: 'email_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  Email!: string;

  @Column({ field: 'username', type: DataType.STRING(45) })
  Username!: string;

  @Column({ field: 'password', type: DataType.STRING(45) })
  Password!: string;

  @Column({ field: 'salt', type: DataType.STRING(45) })
  Salt!: string;
}
