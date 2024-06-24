import { TransformToNumber } from '@app/transformer/transformToNumber';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class Profile {
  @TransformToNumber()
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
