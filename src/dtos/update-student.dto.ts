import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;
  
}
