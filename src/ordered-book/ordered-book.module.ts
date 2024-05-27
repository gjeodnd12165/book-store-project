import { Module } from '@nestjs/common';
import { OrderedBookService } from './ordered-book.service';
import { OrderedBookController } from './ordered-book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderedBook } from './ordered-book.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderedBook])],
  controllers: [OrderedBookController],
  providers: [OrderedBookService],
})
export class OrderedBookModule {}
