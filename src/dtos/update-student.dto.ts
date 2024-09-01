import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({
    description: 'Nome do estudante',
    example: 'Ana Pereira',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Email do estudante',
    example: 'ana.pereira@example.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Interesses do estudante',
    example: ['Python', 'Django', 'Data Science', 'Typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiProperty({
    description: 'Latitude do estudante',
    example: -20.34450000,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude do estudante',
    example: -40.29580000,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;
  
  @ApiProperty({
    description: 'Telefone do estudante',
    example: '+55279987654321',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}

