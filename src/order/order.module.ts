import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.entity';
import { Delivery } from './delivery.entity';
import { OrderedBook } from './ordered-book.entity';
import { CartItem } from '@app/cart-item/cart-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Delivery, OrderedBook, CartItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
