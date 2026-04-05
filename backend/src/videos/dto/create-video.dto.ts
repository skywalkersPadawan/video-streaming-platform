import { IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  videoUrl!: string;

  @IsString()
  thumbnail!: string;
}
