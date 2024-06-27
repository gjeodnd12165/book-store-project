import { Book } from "@app/book/book.entity";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeederService } from "./seeder.service";
import { Category } from "@app/category/category.entity";

@Module({
  imports: [SequelizeModule.forFeature([Book, Category])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}