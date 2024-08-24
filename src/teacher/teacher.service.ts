import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './teacher.dto';

@Injectable()
export class TeacherService {
    private teachers: CreateTeacherDto[] = [];

    async createTeacher(createTeacherDto: CreateTeacherDto): Promise <CreateTeacherDto> {
        this.teachers.push(createTeacherDto);
        return createTeacherDto;
    }

    async findAll(location: string, theme: string): Promise<CreateTeacherDto[]> {
        return this.teachers.filter(teacher => teacher.specialties.includes(theme) && teacher.cep === location);
    }

}