import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { delivery, deliveryId } from './delivery';
import type { orderedBook, orderedBookId } from './orderedBook';
import type { user, userId } from './user';

export interface orderAttributes {
  id: number;
  delivery_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "id" | "created_at" | "updated_at";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  delivery_id!: number;
  user_id!: number;
  created_at!: Date;
  updated_at!: Date;

  // order belongsTo delivery via delivery_id
  delivery!: delivery;
  getDelivery!: Sequelize.BelongsToGetAssociationMixin<delivery>;
  setDelivery!: Sequelize.BelongsToSetAssociationMixin<delivery, deliveryId>;
  createDelivery!: Sequelize.BelongsToCreateAssociationMixin<delivery>;
  // order hasMany orderedBook via order_id
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
  // order belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    delivery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'delivery',
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
    }
  }, {
    tableName: 'order',
    timestamps: true,
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
        name: "orders_delivery_id",
        using: "BTREE",
        fields: [
          { name: "delivery_id" },
        ]
      },
      {
        name: "orders_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof order;
  }
}
