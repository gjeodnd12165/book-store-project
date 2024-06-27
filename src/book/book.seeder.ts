import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Book } from "./book.entity";

@Injectable()
export class BookSeeder implements Seeder {
  constructor(
    @InjectModel(Book)
    private readonly BookModel: typeof Book,
  ) {}

  async seed(): Promise<any> {
    const books = DataFactory.createForClass(Book).generate(20);
  
    return this.BookModel.bulkCreate(books);
  }

  async drop(): Promise<any> {
    return this.BookModel.destroy({
      where: {}
    });
  }
}