import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './book.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Book, Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
