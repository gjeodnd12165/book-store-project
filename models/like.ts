import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';
import type { user, userId } from './user';

export interface likeAttributes {
  user_id: number;
  book_id: number;
}

export type likePk = "user_id" | "book_id";
export type likeId = like[likePk];
export type likeCreationAttributes = likeAttributes;

export class like extends Model<likeAttributes, likeCreationAttributes> implements likeAttributes {
  user_id!: number;
  book_id!: number;

  // like belongsTo book via book_id
  book!: book;
  getBook!: Sequelize.BelongsToGetAssociationMixin<book>;
  setBook!: Sequelize.BelongsToSetAssociationMixin<book, bookId>;
  createBook!: Sequelize.BelongsToCreateAssociationMixin<book>;
  // like belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof like {
    return sequelize.define('like', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'book',
        key: 'id'
      }
    }
  }, {
    tableName: 'like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "book_id" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "book_id_idx",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  }) as typeof like;
  }
}
