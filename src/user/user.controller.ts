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
import { AuthService } from '@app/auth/auth.service';
import { SignInRequestBodyDto, SignInResponseDto } from '@app/auth/dto/signIn.dto';
import { AuthGuard } from '@app/auth/auth.guard';
import {
  FetchProfileRequestDto,
  FetchProfileResponseDto,
} from '@app/auth/dto/fetch-profile.dto';
import { SignUpRequestBodyDto } from '@app/auth/dto/signup.dto';

@Controller('users')
export class UserController {
  constructor(
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
