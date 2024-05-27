import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface userAttributes {
  id?: number;
  email: string;
  username: string;
  password: string;
  salt: string;
}

@Table({ tableName: 'user', timestamps: false })
export class user
  extends Model<userAttributes, userAttributes>
  implements userAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(45) })
  @Index({ name: 'email_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  email!: string;

  @Column({ type: DataType.STRING(45) })
  username!: string;

  @Column({ type: DataType.STRING(45) })
  password!: string;

  @Column({ type: DataType.STRING(45) })
  salt!: string;
}
