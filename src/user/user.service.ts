import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from './user.entity';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { FetchUserByEmailRequestParamDto } from './dto/fetch-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  
  create(
    email: string,
    username: string,
    hashedPassword: string,
    salt: string,
  ): Promise<User> {
    return this.sequelize.transaction((t: Transaction) => {
      return this.userModel.create({
        email: email,
        username: username,
        password: hashedPassword,
        salt: salt,
      }, {
        transaction: t
      });
    })
  }

  findOneByEmail(
    fetchByEmailUserRequestParamDto: FetchUserByEmailRequestParamDto,
  ): Promise<User> {
    const { email } = fetchByEmailUserRequestParamDto;

    return this.sequelize.transaction(async (t: Transaction) => {
      const user = this.userModel.findOne({
        where: {
          email: email,
        },
        transaction: t,
      });

      return user;
    });
  }
}
