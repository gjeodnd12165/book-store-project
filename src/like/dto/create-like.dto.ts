import { IsNumber } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class CreateLikeRequestBodyDto {
  @TransformToNumber()
  @IsNumber()
  readonly userId: number;
}

export class CreateLikeRequestParamDto {
  @TransformToNumber()
  @IsNumber()
  readonly bookId: number;
}

export class CreateLikeResponseDto {}
