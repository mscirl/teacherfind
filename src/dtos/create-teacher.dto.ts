import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({example: 'Ana Paula Costa'})
  @IsString()
  @IsNotEmpty({ message: 'Informe um nome para prosseguir com o cadastro.' })
  name: string;  

  @ApiProperty({example: 'anapaula.costa@example.com'})
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({example: 'P@ula321'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({example: '+55 27 92345-6789'})
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({example: 'Professora de Data Science com 7 anos de experiência.'})
  @IsString()
  @MinLength(10, { message: 'A descrição deve conter no mínimo 10 caracteres.' })
  @MaxLength(200, { message: 'A descrição deve conter no máximo 200 caracteres.' })
  description: string;

  @ApiProperty({example: '29103-123'})
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({example:  [
			"Python",
			"Machine Learning",
			"Data Science"
		]})
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Por favor, informe o(s) conteúdo(s) que deseja ministrar.' })
  specialities: string[];

  @ApiProperty({example: true})
  @IsNotEmpty()
  availability: boolean;

  @ApiProperty({example: -20.34900000})
  @IsOptional()
  latitude?: number;

  @ApiProperty({example: -40.29340000})
  @IsOptional()
  longitude?: number;
}
