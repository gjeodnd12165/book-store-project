import { IsNumberString, IsOptional } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class QueryBookDto {
  @IsNumberString()
  @TransformToNumber()
  bookId: number;

  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  userId: number;
}
