import { IsNumberString, IsOptional } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class QueryBooksDto {
  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  recentDays?: number;

  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  listNum?: number;

  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  page?: number;
}
