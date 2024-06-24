import { IsNumber } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class DeleteLikeRequestBodyDto {
  @TransformToNumber()
  @IsNumber()
  readonly userId: number;
}

export class DeleteLikeRequestParamDto {
  @TransformToNumber()
  @IsNumber()
  readonly bookId: number;
}

export class DeleteLikeResponseDto {}
