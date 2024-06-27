import { BookSeeder } from "@app/book/book.seeder";
import { CategorySeeder } from "@app/category/category.seeder";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly bookSeeder: BookSeeder,
  ) {}

  onApplicationBootstrap() {
    this.categorySeeder.seed();
    this.bookSeeder.seed();
  }
}