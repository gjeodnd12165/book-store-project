import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemRequestBodyDto } from './dto/create-cart-item.dto';
import { AuthGuard } from '@app/auth/auth.guard';
import { FetchCartItemsRequestParamDto } from './dto/fetch-cart-items.dto';
import { User } from '@app/transformer/user.decorator';
import { DeleteCartItemRequestDto } from './dto/delete-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  create(
    @Body() body: CreateCartItemRequestBodyDto,
    @User('id') userId: number,
  ) {
    const { bookId, quantity } = body;
    
    return this.cartItemService.create(bookId, quantity, userId);
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  findAll(
    @Param() param: FetchCartItemsRequestParamDto,
    @User('id') userId: number,
  ) {
    const { cartItemIds } = param;

    return this.cartItemService.findAll(cartItemIds, userId);
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  delete(
    @Param() param: DeleteCartItemRequestDto,
    @User('id') userId: number,
  ) {
    const { cartItemId } = param;

    return this.cartItemService.delete(cartItemId, userId);
  }
}
