import { IsNumber, IsString } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class QueryCategoryResponseDto {
  @IsNumber()
  @TransformToNumber()
  id: number;

  @IsString()
  name: string;
}
