import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Category } from './category.entity';
import { FetchCategoryResponseDto } from './dto/fetch-category.dto';
import { Transaction } from 'sequelize';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async findAll(): Promise<FetchCategoryResponseDto[]> {
    return this.sequelize.transaction(async (t: Transaction) => {
      const categories = await this.categoryModel.findAll<Category>({
        transaction: t,
      });

      return categories.map(
        (category) => new FetchCategoryResponseDto(category),
      );
    });
  }
}
