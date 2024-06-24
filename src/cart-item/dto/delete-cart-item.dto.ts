import { TransformToNumber } from "@app/transformer/transformToNumber";
import { IsNumber } from "class-validator";

export class DeleteCartItemRequestDto {
    @TransformToNumber()
    @IsNumber()
    cartItemId: number;
}