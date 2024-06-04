import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Category } from './category.entity';
import { QueryCategoryResponseDto } from './dto/query-category.dto';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @Inject()
    private readonly sequelize: Sequelize,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async findAll(): Promise<QueryCategoryResponseDto[]> {
    return this.sequelize.transaction(async (t: Transaction) => {
      return await this.categoryModel.findAll<Category>({
        transaction: t,
      });
    });
  }
}
