import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { SucessResponseApi } from 'src/dtos/responses.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<SucessResponseApi<Teacher>> {
    const timestamp = new Date().toISOString();
    const newTeacher = this.teacherRepository.create({
      ...createTeacherDto,
      createdAt: timestamp, 
      updatedAt: timestamp,
    });

    const savedTeacher = await this.teacherRepository.save(newTeacher);

    return {
      data: savedTeacher,
      message: `Cadastro realizado com sucesso! Seja bem-vinde ${createTeacherDto.name}.`,
    };
  }

  async findAll(location: string, theme: string): Promise<Teacher[]> {
    return this.teacherRepository.find({
      where: {
        zipCode: location,
        specialities: theme,
      },
    });
  }
  
  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }
    return teacher;
  }
  
}
