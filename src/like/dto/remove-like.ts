import { IsNumber } from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class RemoveLikeRequestBodyDto {
  @TransformToNumber()
  @IsNumber()
  readonly userId: number;
}

export class RemoveLikeRequestParamDto {
  @TransformToNumber()
  @IsNumber()
  readonly bookId: number;
}

export class RemoveLikeResponseDto {}
