import { IsNumberString, IsOptional } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class QueryBookParamsDto {
  @IsNumberString()
  @TransformToNumber()
  bookId: number;

  @IsOptional()
  @IsNumberString()
  @TransformToNumber()
  userId: number;
}

export class QueryBookResponseDto {
  @IsNumberString()
  @Transform
}
