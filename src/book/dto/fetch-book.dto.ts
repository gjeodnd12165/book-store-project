import {
  IsBoolean,
  IsDate,
  IsInstance,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransformToNumber } from 'src/transformer/transformToNumber';
import { Transform } from 'class-transformer';
import { Book } from '../book.entity';

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

class FetchBooksResponseBooksDto {
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

  @Transform(({ value }) => Number(value))
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
}

class FetchBooksResponsePaginationDto {
  @IsNumber()
  totalBooks: number;

  @IsNumber()
  listNum: number;

  @IsNumber()
  currentPage: number;
}

export class FetchBooksResponseDto {
  @IsInstance(Book, { each: true })
  books: FetchBooksResponseBooksDto[];

  @IsInstance(FetchBooksResponsePaginationDto)
  pagination: FetchBooksResponsePaginationDto;
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

export class FetchDetailedBookResponseDto extends FetchBooksResponseDto {
  @IsOptional()
  @IsString()
  readonly category_name?: string;

  @IsOptional()
  @IsNumber()
  readonly likes?: number;

  @IsOptional()
  @IsBoolean()
  readonly liked?: boolean;
}
