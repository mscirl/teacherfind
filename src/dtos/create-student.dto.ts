import { IsString, IsEmail, IsOptional, IsNumber, Length, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  id: string;

  @ApiProperty({example: 'Lzzy Hale'})
  @IsString()
  @Length(2, 500)
  name: string;

  @ApiProperty({example: 'lzzy_hale@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: '29102-789'})
  @IsString()
  @Length(6, 10)
  zipCode: string;

  @ApiProperty({example: '#S3cur3P@ss'})
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty({example: -20.34450000})
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({example: -40.29580000})
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({example: '+55 27 98765-4321'})
  @IsString()
  @Length(10, 20)
  phone: string;

  @ApiProperty({example: [
			"Python",
			"Django",
			"Data Science",
			"Typescript"
		]})
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}
