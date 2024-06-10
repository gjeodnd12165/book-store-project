import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';

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
      synchronize: false, // temporal
    }),
    CategoryModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
