import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { QueryCategoryResponseDto } from './dto/query-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<QueryCategoryResponseDto[]> {
    return await this.categoryService.findAll();
  }
}
