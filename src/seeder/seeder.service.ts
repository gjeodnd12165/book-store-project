import { Book } from "@app/book/book.entity";
import { Category } from "@app/category/category.entity";
import { faker } from "@faker-js/faker/locale/ko";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class SeederService implements OnApplicationBootstrap{
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  onApplicationBootstrap() {
    this.deleteAll();
    this.seedCategories();
  }

  async deleteAll() {
    this.bookModel.destroy({
      where: {}
    });
    this.categoryModel.destroy({
      where: {}
    })
  }

  async seedBooks() {
    const books = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      title: faker.lorem.sentence(),
      category_id: faker.helpers.rangeToNumber({ min: 0, max: 2 }),
      img: faker.helpers.rangeToNumber({ min: 50, max: 100 }),
      form: '종이책',
      isbn: faker.commerce.isbn(),
      summary: faker.lorem.paragraph(),
      detail: faker.lorem.paragraph(),
      author: faker.person.firstName(),
      pages: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
      contents: faker.lorem.paragraph(),
      price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
      pub_date: new Date(faker.date.past().toISOString()),
    }));

    await this.bookModel.bulkCreate(books);
  }

  async seedCategories() {
    const categories = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      name: faker.word.noun()
    }));

    await this.categoryModel.bulkCreate(categories);
  }
}