import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { book, bookId } from './book';

export interface categoryAttributes {
  id: number;
  name: string;
}

export type categoryPk = "id";
export type categoryId = category[categoryPk];
export type categoryCreationAttributes = categoryAttributes;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  id!: number;
  name!: string;

  // category hasMany book via category_id
  books!: book[];
  getBooks!: Sequelize.HasManyGetAssociationsMixin<book>;
  setBooks!: Sequelize.HasManySetAssociationsMixin<book, bookId>;
  addBook!: Sequelize.HasManyAddAssociationMixin<book, bookId>;
  addBooks!: Sequelize.HasManyAddAssociationsMixin<book, bookId>;
  createBook!: Sequelize.HasManyCreateAssociationMixin<book>;
  removeBook!: Sequelize.HasManyRemoveAssociationMixin<book, bookId>;
  removeBooks!: Sequelize.HasManyRemoveAssociationsMixin<book, bookId>;
  hasBook!: Sequelize.HasManyHasAssociationMixin<book, bookId>;
  hasBooks!: Sequelize.HasManyHasAssociationsMixin<book, bookId>;
  countBooks!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
    return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "name_UNIQUE"
    }
  }, {
    tableName: 'category',
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
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  }) as typeof category;
  }
}
