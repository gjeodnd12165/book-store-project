import { Transaction } from "sequelize";
import { sequelize } from "../sequelize";
import { initModels, likeCreationAttributes } from "../models/init-models";
import { IdNotConvertableError } from "../errors";

const models = initModels(sequelize);


/**
 * inserts relationship who like which book to like table
 * @returns information about INSERT
 */
export async function insertLike(bookId: string, userId: string): Promise<likeCreationAttributes> {
  if (isNaN(Number(bookId))) {
    throw new IdNotConvertableError('bookId should be able to be converted to number.');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const likeRelationship = await models.like.create({
      book_id: +bookId,
      user_id: +userId
    });

    return likeRelationship;
  });
  return result;
}

/**
 * deletes record from Like table with specified bookId and userId
 * @returns number of destroyed rows by DELETE
 */
export async function deleteLike(bookId: string, userId: string): Promise<number> {
  if (isNaN(Number(bookId))) {
    throw new IdNotConvertableError('bookId should be able to be converted to number.');
  }

  const result = await sequelize.transaction(async (t: Transaction) => {
    const deleteCount = await models.like.destroy({
      where: {
        book_id: +bookId,
        user_id: +userId
      }
    });

    return deleteCount;
  });
  return result;
}