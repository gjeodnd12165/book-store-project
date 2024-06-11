import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserRequestParamDto {
  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsStrongPassword()
  @Exclude({ toPlainOnly: true })
  password: string;
}
