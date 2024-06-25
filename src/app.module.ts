import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';

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
      synchronize: true, // temporal
    }),
    ConfigModule.forRoot(),
    CategoryModule,
    BookModule,
    LikeModule,
    UserModule,
    CartItemModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
