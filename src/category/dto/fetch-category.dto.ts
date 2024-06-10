import { IsNumber, IsString } from 'class-validator';
import { Category } from '../category.entity';

export class FetchCategoryResponseDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
