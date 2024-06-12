import { IsEmail, IsString } from 'class-validator';

export class Profile {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
