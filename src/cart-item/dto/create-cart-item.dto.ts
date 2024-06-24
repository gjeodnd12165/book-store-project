import { TransformToNumber } from "@app/transformer/transformToNumber";
import { IsNumber } from "class-validator";

export class CreateCartItemRequestBodyDto {
  @TransformToNumber()
  @IsNumber()
  bookId: number;

  @TransformToNumber()
  @IsNumber()
  quantity: number;
}
