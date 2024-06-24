import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './like.entity';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
