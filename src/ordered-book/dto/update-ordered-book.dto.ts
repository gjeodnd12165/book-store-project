import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderedBookDto } from './create-ordered-book.dto';

export class UpdateOrderedBookDto extends PartialType(CreateOrderedBookDto) {}
