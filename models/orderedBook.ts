import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { order, orderId } from './order';

export interface orderedBookAttributes {
  id: number;
  order_id: number;
  book_id: number;
  quantity: number;
}

export type orderedBookPk = "id";
export type orderedBookId = orderedBook[orderedBookPk];
export type orderedBookOptionalAttributes = "id";
export type orderedBookCreationAttributes = Optional<orderedBookAttributes, orderedBookOptionalAttributes>;

export class orderedBook extends Model<orderedBookAttributes, orderedBookCreationAttributes> implements orderedBookAttributes {
  id!: number;
  order_id!: number;
  book_id!: number;
  quantity!: number;

  // orderedBook belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;
  // orderedBook belongsTo order via order_id
  order!: order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orderedBook {
    return sequelize.define('orderedBook', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'orderedBook',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "orderedBooks_order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "orderedBooks_user_id",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  }) as typeof orderedBook;
  }
}
