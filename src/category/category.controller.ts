import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FetchCategoryResponseDto } from './dto/fetch-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<FetchCategoryResponseDto[]> {
    return await this.categoryService.findAll();
  }
}
