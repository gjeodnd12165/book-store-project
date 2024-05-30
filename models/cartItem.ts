import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { user, userId } from './user';

export interface cartItemAttributes {
  id: number;
  book_id: number;
  user_id: number;
  quantity: number;
}

export type cartItemPk = "id";
export type cartItemId = cartItem[cartItemPk];
export type cartItemOptionalAttributes = "id" | "quantity";
export type cartItemCreationAttributes = Optional<cartItemAttributes, cartItemOptionalAttributes>;

export class cartItem extends Model<cartItemAttributes, cartItemCreationAttributes> implements cartItemAttributes {
  id!: number;
  book_id!: number;
  user_id!: number;
  quantity!: number;

  // cartItem belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;
  // cartItem belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cartItem {
    return sequelize.define('cartItem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'cartItem',
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
        name: "cartItems_book_id_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "cartItems_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof cartItem;
  }
}
