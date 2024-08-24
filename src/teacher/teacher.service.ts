import { Injectable } from '@nestjs/common';
import { SucessResponseApi } from 'src/dtos/responses.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTeacherDto } from '../dtos/teacher.dto';

@Injectable()
export class TeacherService {
    private teachers: CreateTeacherDto[] = [];

    async createTeacher(createTeacherDto: CreateTeacherDto): Promise <SucessResponseApi<CreateTeacherDto>> {
        const newTeacher = {...createTeacherDto,
            id: uuidv4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        this.teachers.push(newTeacher);

        return {
            data: newTeacher,
            message: `Cadastro realizado com sucesso! Seja bem-vinde ${createTeacherDto.name}.`
        };
    }

    
    async findAll(location: string, theme: string): Promise<CreateTeacherDto[]> {
        return this.teachers.filter(teacher => teacher.specialties.includes(theme) && teacher.cep === location);
    }

}