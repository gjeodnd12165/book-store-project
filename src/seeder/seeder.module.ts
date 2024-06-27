import { BookSeeder } from '@app/book/book.seeder';
import { CategorySeeder } from '@app/category/category.seeder';
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '@app/book/book.entity';
import { Category } from '@app/category/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category, Book])],
  providers: [SeederService, CategorySeeder, BookSeeder],
})
export class SeederModule {}
