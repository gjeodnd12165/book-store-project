import { Transaction } from "sequelize";
import { sequelize } from "../sequelize";
import { categoriesAttributes, initModels } from "../models/init-models";

const models = initModels(sequelize);

/**
 * @returns all the categories
 */
export async function searchCategories(): Promise<categoriesAttributes[]> {
  const result = sequelize.transaction(async (t: Transaction) => {
    const categories = await models.categories.findAll();

    return categories;
  });
  return result;
}