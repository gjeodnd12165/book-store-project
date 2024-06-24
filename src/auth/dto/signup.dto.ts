import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignUpRequestBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;
}
