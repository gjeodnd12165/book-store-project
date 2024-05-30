import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { cartItem, cartItemId } from './cartItem';
import type { like, likeId } from './like';
import type { order, orderId } from './order';

export interface userAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  salt: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  email!: string;
  username!: string;
  password!: string;
  salt!: string;

  // user belongsToMany book via user_id and book_id
  book_id_books!: book[];
  getBook_id_books!: Sequelize.BelongsToManyGetAssociationsMixin<book>;
  setBook_id_books!: Sequelize.BelongsToManySetAssociationsMixin<book, bookId>;
  addBook_id_book!: Sequelize.BelongsToManyAddAssociationMixin<book, bookId>;
  addBook_id_books!: Sequelize.BelongsToManyAddAssociationsMixin<book, bookId>;
  createBook_id_book!: Sequelize.BelongsToManyCreateAssociationMixin<book>;
  removeBook_id_book!: Sequelize.BelongsToManyRemoveAssociationMixin<book, bookId>;
  removeBook_id_books!: Sequelize.BelongsToManyRemoveAssociationsMixin<book, bookId>;
  hasBook_id_book!: Sequelize.BelongsToManyHasAssociationMixin<book, bookId>;
  hasBook_id_books!: Sequelize.BelongsToManyHasAssociationsMixin<book, bookId>;
  countBook_id_books!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany cartItem via user_id
  cartItems!: cartItem[];
  getCartItems!: Sequelize.HasManyGetAssociationsMixin<cartItem>;
  setCartItems!: Sequelize.HasManySetAssociationsMixin<cartItem, cartItemId>;
  addCartItem!: Sequelize.HasManyAddAssociationMixin<cartItem, cartItemId>;
  addCartItems!: Sequelize.HasManyAddAssociationsMixin<cartItem, cartItemId>;
  createCartItem!: Sequelize.HasManyCreateAssociationMixin<cartItem>;
  removeCartItem!: Sequelize.HasManyRemoveAssociationMixin<cartItem, cartItemId>;
  removeCartItems!: Sequelize.HasManyRemoveAssociationsMixin<cartItem, cartItemId>;
  hasCartItem!: Sequelize.HasManyHasAssociationMixin<cartItem, cartItemId>;
  hasCartItems!: Sequelize.HasManyHasAssociationsMixin<cartItem, cartItemId>;
  countCartItems!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany like via user_id
  likes!: like[];
  getLikes!: Sequelize.HasManyGetAssociationsMixin<like>;
  setLikes!: Sequelize.HasManySetAssociationsMixin<like, likeId>;
  addLike!: Sequelize.HasManyAddAssociationMixin<like, likeId>;
  addLikes!: Sequelize.HasManyAddAssociationsMixin<like, likeId>;
  createLike!: Sequelize.HasManyCreateAssociationMixin<like>;
  removeLike!: Sequelize.HasManyRemoveAssociationMixin<like, likeId>;
  removeLikes!: Sequelize.HasManyRemoveAssociationsMixin<like, likeId>;
  hasLike!: Sequelize.HasManyHasAssociationMixin<like, likeId>;
  hasLikes!: Sequelize.HasManyHasAssociationsMixin<like, likeId>;
  countLikes!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany order via user_id
  orders!: order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'user',
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
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  }) as typeof user;
  }
}
