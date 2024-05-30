import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItemModule } from './cart-item/cart-item.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { OrderedBookModule } from './ordered-book/ordered-book.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'BookShop',
      autoLoadModels: true,
      synchronize: true,
    }),
    BookModule,
    CartItemModule,
    CategoryModule,
    LikeModule,
    OrderModule,
    UserModule,
    OrderedBookModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
