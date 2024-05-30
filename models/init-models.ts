import type { Sequelize } from "sequelize";
import { book as _book } from "./book";
import type { bookAttributes, bookCreationAttributes } from "./book";
import { cartItem as _cartItem } from "./cartItem";
import type { cartItemAttributes, cartItemCreationAttributes } from "./cartItem";
import { category as _category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { delivery as _delivery } from "./delivery";
import type { deliveryAttributes, deliveryCreationAttributes } from "./delivery";
import { like as _like } from "./like";
import type { likeAttributes, likeCreationAttributes } from "./like";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { orderedBook as _orderedBook } from "./orderedBook";
import type { orderedBookAttributes, orderedBookCreationAttributes } from "./orderedBook";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _book as book,
  _cartItem as cartItem,
  _category as category,
  _delivery as delivery,
  _like as like,
  _order as order,
  _orderedBook as orderedBook,
  _user as user,
};

export type {
  bookAttributes,
  bookCreationAttributes,
  cartItemAttributes,
  cartItemCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  deliveryAttributes,
  deliveryCreationAttributes,
  likeAttributes,
  likeCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  orderedBookAttributes,
  orderedBookCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const book = _book.initModel(sequelize);
  const cartItem = _cartItem.initModel(sequelize);
  const category = _category.initModel(sequelize);
  const delivery = _delivery.initModel(sequelize);
  const like = _like.initModel(sequelize);
  const order = _order.initModel(sequelize);
  const orderedBook = _orderedBook.initModel(sequelize);
  const user = _user.initModel(sequelize);

  book.belongsToMany(user, { as: 'user_id_users', through: like, foreignKey: "book_id", otherKey: "user_id" });
  user.belongsToMany(book, { as: 'book_id_books', through: like, foreignKey: "user_id", otherKey: "book_id" });
  cartItem.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(cartItem, { as: "cartItems", foreignKey: "book_id"});
  like.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(like, { as: "likes", foreignKey: "book_id"});
  orderedBook.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(orderedBook, { as: "orderedBooks", foreignKey: "book_id"});
  book.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(book, { as: "books", foreignKey: "category_id"});
  order.belongsTo(delivery, { as: "delivery", foreignKey: "delivery_id"});
  delivery.hasMany(order, { as: "orders", foreignKey: "delivery_id"});
  orderedBook.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(orderedBook, { as: "orderedBooks", foreignKey: "order_id"});
  cartItem.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(cartItem, { as: "cartItems", foreignKey: "user_id"});
  like.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(like, { as: "likes", foreignKey: "user_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});

  return {
    book: book,
    cartItem: cartItem,
    category: category,
    delivery: delivery,
    like: like,
    order: order,
    orderedBook: orderedBook,
    user: user,
  };
}
