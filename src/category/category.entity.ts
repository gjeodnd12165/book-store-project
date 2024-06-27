import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Factory } from 'nestjs-seeder';
import { fakerKO as faker } from '@faker-js/faker';

@Table({ tableName: 'category', timestamps: false })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING(100) })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  @Factory((faker) => faker.word.noun())
  readonly name: string;
}
