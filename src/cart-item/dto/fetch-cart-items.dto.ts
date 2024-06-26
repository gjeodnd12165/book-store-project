import { IsArray, IsNumber } from 'class-validator';

export class FetchCartItemsRequestParamDto {
  @IsArray({ each: true })
  @IsNumber()
  cartItemIds: number[];
}
