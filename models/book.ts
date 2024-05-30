import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cartItem, cartItemId } from './cartItem';
import type { category, categoryId } from './category';
import type { like, likeId } from './like';
import type { orderedBook, orderedBookId } from './orderedBook';
import type { user, userId } from './user';

export interface bookAttributes {
  id: number;
  title: string;
  img?: number;
  category_id: number;
  form: string;
  author: string;
  isbn: string;
  pages: string;
  summary?: string;
  detail?: string;
  contents?: string;
  price: number;
  pub_date: string;
}

export type bookPk = "id";
export type bookId = book[bookPk];
export type bookOptionalAttributes = "id" | "img" | "summary" | "detail" | "contents";
export type bookCreationAttributes = Optional<bookAttributes, bookOptionalAttributes>;

export class book extends Model<bookAttributes, bookCreationAttributes> implements bookAttributes {
  id!: number;
  title!: string;
  img?: number;
  category_id!: number;
  form!: string;
  author!: string;
  isbn!: string;
  pages!: string;
  summary?: string;
  detail?: string;
  contents?: string;
  price!: number;
  pub_date!: string;

  // book hasMany cartItem via book_id
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
  // book hasMany like via book_id
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
  // book hasMany orderedBook via book_id
  orderedBooks!: orderedBook[];
  getOrderedBooks!: Sequelize.HasManyGetAssociationsMixin<orderedBook>;
  setOrderedBooks!: Sequelize.HasManySetAssociationsMixin<orderedBook, orderedBookId>;
  addOrderedBook!: Sequelize.HasManyAddAssociationMixin<orderedBook, orderedBookId>;
  addOrderedBooks!: Sequelize.HasManyAddAssociationsMixin<orderedBook, orderedBookId>;
  createOrderedBook!: Sequelize.HasManyCreateAssociationMixin<orderedBook>;
  removeOrderedBook!: Sequelize.HasManyRemoveAssociationMixin<orderedBook, orderedBookId>;
  removeOrderedBooks!: Sequelize.HasManyRemoveAssociationsMixin<orderedBook, orderedBookId>;
  hasOrderedBook!: Sequelize.HasManyHasAssociationMixin<orderedBook, orderedBookId>;
  hasOrderedBooks!: Sequelize.HasManyHasAssociationsMixin<orderedBook, orderedBookId>;
  countOrderedBooks!: Sequelize.HasManyCountAssociationsMixin;
  // book belongsToMany user via book_id and user_id
  user_id_users!: user[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // book belongsTo category via category_id
  category!: category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<category, categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<category>;

  static initModel(sequelize: Sequelize.Sequelize): typeof book {
    return sequelize.define('book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    img: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    form: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    pages: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pub_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'book',
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
        name: "category_id_idx",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  }) as typeof book;
  }
}
