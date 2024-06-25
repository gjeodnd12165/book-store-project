import { Book } from "@app/book/book.entity";
import { Order } from "@app/order/order.entity";
import { Column, DataType, ForeignKey, Index, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'orderedBook', timestamps: false })
export class OrderedBook extends Model<OrderedBook> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ using: 'BTREE', order: 'ASC', unique: true })
  readonly id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Order)
  readonly order_id: number;

  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Book)
  readonly book_id: number;

  @Column({ type: DataType.INTEGER })
  readonly quantity: number;
}
