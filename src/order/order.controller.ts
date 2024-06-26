import { Body, Controller, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestBodyDto } from './dto/create-order.dto';
import { User } from '@app/transformer/user.decorator';
import { AuthGuard } from '@app/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  create(@Body() body: CreateOrderRequestBodyDto, @User('id') userId: number) {
    const { cartItemIds, deilvery } = body;
    const { address, receiver, contact } = deilvery;

    return this.orderService.create(
      cartItemIds,
      address,
      receiver,
      contact,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  findAll(@User('id') userId: number) {
    return this.orderService.findAll(userId);
  }
}
