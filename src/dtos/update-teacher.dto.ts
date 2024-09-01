import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({
    description: 'Nome do professor',
    example: 'Ana Paula Costa',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Email do professor',
    example: 'anapaula.costa@example.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Especialidades do professor',
    example: ['Python', 'Machine Learning', 'Data Science'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialities?: string[];

  @ApiProperty({
    description: 'Disponibilidade do professor',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @ApiProperty({
    description: 'CEP do professor',
    example: '29103-123',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({
    description: 'Latitude do professor',
    example: -20.34900000,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude do professor',
    example: -40.29340000,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({
    description: 'Telefone do professor',
    example: '+55 27 92345-6789',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Descrição do professor',
    example: 'Professora de Data Science com 7 anos de experiência.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

