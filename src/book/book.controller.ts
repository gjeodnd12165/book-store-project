import { Body, Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import {
  FetchBookRequestBodyDto,
  FetchBookRequestParamDto,
  FetchBookResponseDto,
  FetchBooksRequestQueryDto,
  FetchBooksResponseDto,
} from './dto/fetch-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(200)
  findAll(
    @Query() query: FetchBooksRequestQueryDto,
  ): Promise<FetchBooksResponseDto[]> {
    return this.bookService.findAll(query);
  }

  @Get(':bookId')
  @HttpCode(200)
  findOne(
    @Param() param: FetchBookRequestParamDto,
    @Body() body: FetchBookRequestBodyDto,
  ): Promise<FetchBookResponseDto> {
    return this.bookService.findOne(param, body);
  }
}
