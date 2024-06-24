import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@app/auth/auth.module';
import { User } from './user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [forwardRef(() => AuthModule), SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
