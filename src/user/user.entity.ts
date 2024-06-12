import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING(45) })
  @Index({ name: 'email_UNIQUE', using: 'BTREE', order: 'ASC', unique: true })
  readonly email: string;

  @Column({ type: DataType.STRING(45) })
  readonly username: string;

  @Column({ type: DataType.STRING(45) })
  readonly password: string;

  @Column({ type: DataType.STRING(45) })
  readonly salt: string;
}
