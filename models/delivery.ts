import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface deliveryAttributes {
  id: number;
  address: string;
  receiver: string;
  contact: string;
}

export type deliveryPk = "id";
export type deliveryId = delivery[deliveryPk];
export type deliveryOptionalAttributes = "id";
export type deliveryCreationAttributes = Optional<deliveryAttributes, deliveryOptionalAttributes>;

export class delivery extends Model<deliveryAttributes, deliveryCreationAttributes> implements deliveryAttributes {
  id!: number;
  address!: string;
  receiver!: string;
  contact!: string;

  // delivery hasMany order via delivery_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof delivery {
    return sequelize.define('delivery', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    receiver: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'delivery',
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
    ]
  }) as typeof delivery;
  }
}
