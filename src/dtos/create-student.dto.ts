import { IsString, IsEmail, IsOptional, IsNumber, Length, IsArray, IsUUID } from 'class-validator';

export class CreateStudentDto {
  id: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsString()
  @Length(10, 15)
  phone: string;

  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
