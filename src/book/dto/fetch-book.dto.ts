import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Book } from '../book.entity';
import { TransformToNumber } from 'src/transformer/transformToNumber';

export class FetchBooksRequestQueryDto {
  @IsOptional()
  @TransformToNumber()
  @IsNumber()
  readonly categoryId?: number;

  @IsOptional()
  @TransformToNumber()
  @IsNumber()
  readonly recentDays?: number;

  @IsOptional()
  @TransformToNumber()
  @IsNumber()
  readonly listNum: number = 8;

  @IsOptional()
  @TransformToNumber()
  @IsNumber()
  readonly page: number = 1;
}

export class FetchBooksResponseDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly img: number;

  @IsNumber()
  readonly category_id: number;

  @IsString()
  readonly form: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly isbn: string;

  @IsNumber()
  readonly pages: number;

  @IsString()
  readonly summary: string;

  @IsString()
  readonly detail: string;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly price: number;

  @IsDate()
  readonly pub_date: Date;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.img = book.img;
    this.category_id = book.category_id;
    this.form = book.form;
    this.author = book.author;
    this.isbn = String(book.isbn);
    this.pages = book.pages;
    this.summary = book.summary;
    this.detail = book.detail;
    this.contents = book.contents;
    this.price = book.price;
    this.pub_date = book.pub_date;
  }
}

export class FetchBookRequestBodyDto {
  @TransformToNumber()
  @IsNumber()
  readonly userId: number;
}

export class FetchBookRequestParamDto {
  @TransformToNumber()
  @IsNumber()
  readonly bookId: number;
}

export class FetchBookResponseDto extends FetchBooksResponseDto {
  @IsOptional()
  @IsString()
  readonly category_name?: string;

  @IsOptional()
  @IsNumber()
  readonly likes?: number;

  @IsOptional()
  @IsBoolean()
  readonly liked?: boolean;

  constructor(
    book: Book,
    category_name?: string,
    likes?: number,
    liked?: boolean,
  ) {
    super(book);
    this.category_name = category_name;
    this.likes = likes;
    this.liked = liked;
  }
}
