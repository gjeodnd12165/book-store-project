import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestBodyDto, SignInResponseDto } from './dto/signIn.dto';
import * as crypto from 'crypto';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  signUp(
    email: string,
    password: string,
    username: string,
  ): Promise<User> {
    const salt: string = crypto.randomBytes(10).toString('base64');
    const hashedPassword: string = this.getHashedPassword(password, salt);
    
    return this.userService.create(email, username, hashedPassword, salt);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<SignInResponseDto> {
    const user = await this.userService.findOneByEmail({
      email,
    });

    const hashedPassword = this.getHashedPassword(password, user.salt);

    if (user.password !== hashedPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }

  getHashedPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
      .toString('base64');
  }
}
