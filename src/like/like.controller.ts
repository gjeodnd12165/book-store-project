import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeRequestBodyDto, CreateLikeRequestParamDto, CreateLikeResponseDto } from './dto/create-like.dto';
import { DeleteLikeRequestBodyDto, DeleteLikeRequestParamDto, DeleteLikeResponseDto } from './dto/delete-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(201)
  create(
    @Param() param: CreateLikeRequestParamDto,
    @Body() body: CreateLikeRequestBodyDto,
  ): Promise<CreateLikeResponseDto> {
    const { bookId } = param;
    const { userId } = body;

    return this.likeService.create(bookId, userId);
  }

  @Delete()
  @HttpCode(200)
  delete(
    @Param() param: DeleteLikeRequestParamDto,
    @Body() body: DeleteLikeRequestBodyDto,
  ): Promise<DeleteLikeResponseDto> {
    const { bookId } = param;
    const { userId } = body;

    return this.likeService.delete(bookId, userId);
  }
}
