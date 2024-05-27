import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderedBookService } from './ordered-book.service';
import { CreateOrderedBookDto } from './dto/create-ordered-book.dto';
import { UpdateOrderedBookDto } from './dto/update-ordered-book.dto';

@Controller('ordered-book')
export class OrderedBookController {
  constructor(private readonly orderedBookService: OrderedBookService) {}

  @Post()
  create(@Body() createOrderedBookDto: CreateOrderedBookDto) {
    return this.orderedBookService.create(createOrderedBookDto);
  }

  @Get()
  findAll() {
    return this.orderedBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderedBookDto: UpdateOrderedBookDto) {
    return this.orderedBookService.update(+id, updateOrderedBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderedBookService.remove(+id);
  }
}
