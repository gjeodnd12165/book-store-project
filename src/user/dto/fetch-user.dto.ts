import { IsEmail } from 'class-validator';
import { User } from '../user.entity';

export class FetchUserByEmailRequestParamDto {
  @IsEmail()
  email: string;
}

export class FetchByEmailUserResponseDto extends User {}

export class FetchUserRequestParamDto {}
