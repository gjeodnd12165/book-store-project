import { IsEmail, IsJWT, IsString } from 'class-validator';

export class SignInRequestBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignInResponseDto {
  @IsJWT()
  accessToken: string;
}
