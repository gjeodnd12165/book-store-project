import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '@app/category/category.entity';
import { fakerKO as faker } from '@faker-js/faker';
import { Factory } from 'nestjs-seeder';

@Table({ tableName: 'book', timestamps: false })
export class Book extends Model<Book> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.STRING })
  @Factory((faker) => faker.lorem.words(3))
  readonly title: string;

  @Column({ type: DataType.INTEGER })
  @Factory((faker) => faker.number.int({ min: 50, max: 100 }))
  readonly img: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Category)
  @Factory((faker) => faker.number.int({ min: 1, max: 5 }))
  readonly category_id: number;

  @Column({ type: DataType.STRING })
  @Factory(() => '종이책')
  readonly form: string;

  @Column({ type: DataType.STRING })
  @Factory((faker) => faker.person.firstName())
  readonly author: string;

  @Column({ type: DataType.STRING })
  @Factory((faker) => faker.commerce.isbn())
  readonly isbn: string;

  @Column({ type: DataType.INTEGER })
  @Factory((faker) => faker.number.int({ min: 100, max: 1000 }))
  readonly pages: number;

  @Column({ type: DataType.STRING })
  @Factory((faker) => faker.lorem.words(5))
  readonly summary: string;

  @Column({ type: DataType.STRING })
  @Factory((faker) => faker.lorem.words(5))
  readonly detail: string;

  @Column({ type: DataType.STRING(1023) })
  @Factory((faker) => faker.lorem.words(10))
  readonly contents: string;

  @Column({ type: DataType.INTEGER })
  @Factory((faker) => faker.number.int({ min: 10000, max: 50000 }))
  readonly price: number;

  @Column({ type: DataType.DATE })
  @Factory((faker) => new Date(faker.date.past()))
  readonly pub_date: Date;

  @BelongsTo(() => Category)
  readonly category: Category;
}
