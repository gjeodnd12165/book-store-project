import { IsArray, IsInstance, IsNumber } from "class-validator";
import { Delivery } from "../delivery.entity";
import { Exclude } from "class-transformer";

export class CreateOrderRequestBodyDto {
  @IsArray({ each: true })
  @IsNumber()
  cartItemIds: number[];

  @IsInstance(Delivery)
  deilvery: Delivery;
}