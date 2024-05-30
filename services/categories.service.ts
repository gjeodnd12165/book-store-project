import { Transaction } from "sequelize";
import { sequelize } from "../sequelize";
import { categoryAttributes, initModels } from "../models/init-models";

const models = initModels(sequelize);

/**
 * @returns all the categories
 */
export async function searchCategories(): Promise<categoryAttributes[]> {
  const result = sequelize.transaction(async (t: Transaction) => {
    const categories = await models.category.findAll({
      transaction: t
    });

    return categories;
  });
  return result;
}