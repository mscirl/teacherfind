import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { SucessResponseApi } from 'src/dtos/responses.dto';
import { UpdateTeacherDto } from 'src/dtos/update-teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<SucessResponseApi<Teacher>> {
    const timestamp = new Date().toISOString();
    
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

    // Criar o objeto de professores, substituindo a senha pelo hash
    const newTeacher = this.teacherRepository.create({
      ...createTeacherDto,
      password: hashedPassword,
      createdAt: timestamp, 
    });

    const savedTeacher = await this.teacherRepository.save(newTeacher);

    return {
      data: savedTeacher,
      message: `Cadastro realizado com sucesso! Seja bem-vinde ${createTeacherDto.name}.`,
    };
  }

async findAll(location: string, theme: string): Promise<{ message: string; teachers: Teacher[]; count: number }> {
  // Contar o número total de professores que correspondem aos critérios
  const count = await this.teacherRepository.count({
    where: {
      zipCode: location,
      specialities: theme,
    },
  });

  const teachers = await this.teacherRepository.find({
    where: {
      zipCode: location,
      specialities: theme,
    },
  });

  return {
    message: `${count} professores encontrados`,
    teachers,
    count,
  };
}  
  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Professor com ID ${id} não encontrado`);
    }
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<SucessResponseApi<Teacher>> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if (!teacher) {
      throw new NotFoundException(`Professor(a) com ID ${id} não encontrado`);
    }

    const updatedTimestamp = new Date().toISOString();
    await this.teacherRepository.update(id, { ...updateTeacherDto, updatedAt: updatedTimestamp });

    const updatedTeacher = await this.teacherRepository.findOne({ where: { id } });

    return {
      data: updatedTeacher,
      message: `Cadastro de professor(a) ${updatedTeacher.name} atualizado com sucesso!`,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if (!teacher) {
      throw new NotFoundException(`Professor(a) com ID ${id} não encontrado`);
    }

    await this.teacherRepository.delete(id);

    return {
      message: `Professor(a) com ID ${id} removido com sucesso!`,
    };
  }
  
}
