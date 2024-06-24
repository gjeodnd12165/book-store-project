import { Body, Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import {
  FetchBookRequestBodyDto,
  FetchBookRequestParamDto,
  FetchDetailedBookResponseDto,
  FetchBooksRequestQueryDto,
} from './dto/fetch-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(200)
  findAll(
    @Query() query: FetchBooksRequestQueryDto,
  ): Promise<FetchDetailedBookResponseDto[]> {
    const { categoryId, recentDays, listNum, page } = query;

    return this.bookService.findAll(categoryId, recentDays, listNum, page);
  }

  @Get(':bookId')
  @HttpCode(200)
  findOne(
    @Param() param: FetchBookRequestParamDto,
    @Body() body: FetchBookRequestBodyDto,
  ): Promise<FetchDetailedBookResponseDto> {
    const { bookId } = param;
    const { userId } = body;

    return this.bookService.findOne(bookId, userId);
  }
}
