import { Injectable } from "@nestjs/common";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Category } from "./category.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CategorySeeder implements Seeder {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async seed(): Promise<any> {
    const categories = DataFactory.createForClass(Category).generate(5);
  
    return this.categoryModel.bulkCreate(categories);
  }

  async drop(): Promise<any> {
    return this.categoryModel.destroy({
      where: {}
    });
  }
}