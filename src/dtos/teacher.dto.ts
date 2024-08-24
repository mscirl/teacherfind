import { IsArray, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTeacherDto {
@IsString()
@IsNotEmpty( {message: 'Informe um nome para prosseguir com o cadastro.'} )
name: string;

@IsEmail()
@IsNotEmpty()
mail: string;

@IsString()
@IsNotEmpty()
password: string;

@IsString()
@IsNotEmpty()
@IsPhoneNumber('BR')
telefone: string;

@IsString()
@MinLength(10, {message: 'A descrição deve conter no mínimo 10 caracteres.'})
@MaxLength(120, {message: 'A descrição deve conter no máximo 120 caracteres.'})
description: string;

@IsString()
@IsNotEmpty()
cep: string;

@IsArray()
@IsString({ each: true })
@IsNotEmpty({ message: 'Por favor, informe o(s) conteúdo(s) que deseja ministrar.'})
specialties: string[];

@IsNotEmpty()
availability: boolean;

@IsDateString()
created_at: string;

@IsDateString()
updated_at: string;
}
