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

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    signInRequestDto: SignInRequestBodyDto,
  ): Promise<SignInResponseDto> {
    const { email, password } = signInRequestDto;

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
