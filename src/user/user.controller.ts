import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Request,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { SignInRequestBodyDto, SignInResponseDto } from './auth/dto/signIn.dto';
import { AuthGuard } from './auth/auth.guard';
import {
  FetchProfileRequestDto,
  FetchProfileResponseDto,
} from './auth/dto/fetch-profile.dto';
import { SignUpRequestBodyDto } from './auth/dto/signup.dto';

@Controller('users')
export class UserController {
  constructor(
    // @Inject()
    // private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  signUp(@Body() body: SignUpRequestBodyDto) {
    const { email, password, username } = body;

    return this.authService.signUp(email, password, username);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() body: SignInRequestBodyDto): Promise<SignInResponseDto> {
    const { email, password } = body;

    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: FetchProfileRequestDto): FetchProfileResponseDto {
    return req.user;
  }
}
