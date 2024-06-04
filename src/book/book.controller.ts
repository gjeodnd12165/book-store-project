import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { plainToInstance } from 'class-transformer';
import { GetBooksQueryDto } from './dto/get-books-query.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Post()
  // create(@Body() createBookDto: CreateBookDto) {
  //   return this.bookService.create(createBookDto);
  // }

  @Get()
  async findAll(
    @Query() query: GetBooksQueryDto
  ): Promise<Book[]> {
    const dto: GetBooksQueryDto = plainToInstance(GetBooksQueryDto, query)

    return await this.bookService.findAll(dto);
  }

  @Get(':id')
  findOne(
    @Param('bookId', new DefaultValuePipe(), new ParseIntPipe()) userId: number,
    @Param('userId') 
  ) {
    return this.bookService.findOne(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }
}
