import { IsNumberString, IsOptional } from 'class-validator';

export class GetBooksQueryDto {
  @IsNumberString()
  @IsOptional()
  categoryId?: string;

  @IsNumberString()
  @IsOptional()
  recentDays?: string;

  @IsNumberString()
  @IsOptional()
  listNum?: string;

  @IsNumberString()
  @IsOptional()
  page?: string;
}
