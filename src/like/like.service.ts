import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Like } from './like.entity';
import {
  CreateLikeRequestParamDto,
  CreateLikeRequestBodyDto,
  CreateLikeResponseDto,
} from './dto/create-like.dto';
import { Transaction } from 'sequelize';
import {
  DeleteLikeRequestBodyDto,
  DeleteLikeRequestParamDto,
  DeleteLikeResponseDto,
} from './dto/delete-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Like)
    private readonly likeModel: typeof Like,
  ) {}

  create(userId: number, bookId: number): Promise<CreateLikeResponseDto> {
    return this.sequelize.transaction(async (t: Transaction) => {
      const likeRelationship = await this.likeModel.create(
        {
          book_id: bookId,
          user_id: userId,
        },
        {
          transaction: t,
        },
      );

      return likeRelationship;
    });
  }

  delete(userId: number, bookId: number): Promise<DeleteLikeResponseDto> {
    return this.sequelize.transaction(async (t: Transaction) => {
      const deleteCount = await this.likeModel.destroy({
        where: {
          book_id: bookId,
          user_id: userId,
        },
        transaction: t,
      });

      return deleteCount;
    });
  }
}
