import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface BookAttributes {
  Id?: number;
  Title: string;
  Img?: number;
  CategoryId: number;
  Form: string;
  Author: string;
  Isbn: string;
  Pages: string;
  Summary?: string;
  Detail?: string;
  Contents?: string;
  Price: number;
  PubDate: string;
}

@Table({ tableName: 'books', timestamps: false })
export class Book
  extends Model<BookAttributes, BookAttributes>
  implements BookAttributes
{
  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  Id?: number;

  @Column({ field: 'title', type: DataType.STRING(45) })
  Title!: string;

  @Column({ field: 'img', allowNull: true, type: DataType.INTEGER })
  Img?: number;

  @Column({ field: 'category_id', type: DataType.INTEGER })
  @Index({
    name: 'category_id_idx',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  CategoryId!: number;

  @Column({ field: 'form', type: DataType.STRING(45) })
  Form!: string;

  @Column({ field: 'author', type: DataType.STRING(45) })
  Author!: string;

  @Column({ field: 'isbn', type: DataType.STRING(45) })
  Isbn!: string;

  @Column({ field: 'pages', type: DataType.STRING(45) })
  Pages!: string;

  @Column({ field: 'summary', allowNull: true, type: DataType.STRING(500) })
  Summary?: string;

  @Column({ field: 'detail', allowNull: true, type: DataType.STRING })
  Detail?: string;

  @Column({ field: 'contents', allowNull: true, type: DataType.STRING(45) })
  Contents?: string;

  @Column({ field: 'price', type: DataType.INTEGER })
  Price!: number;

  @Column({ field: 'pub_date', type: DataType.DATEONLY })
  PubDate!: string;
}
