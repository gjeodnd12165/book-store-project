import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class FetchByEmailUserRequestParamDto {
  @IsEmail()
  email: string;
}

export class FetchUserRequestParamDto {

}
