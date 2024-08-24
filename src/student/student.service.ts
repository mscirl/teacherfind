import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { CreateStudentResponse, FindAllStudentsResponse, FindOneStudentResponse } from './student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<CreateStudentResponse> {
    const student = this.studentRepository.create(createStudentDto);
    await this.studentRepository.save(student);
    return { message: 'Estudante criado com sucesso!', student };
  }

  async findAll(): Promise<FindAllStudentsResponse> {
    const students = await this.studentRepository.find();
    const count = await this.studentRepository.count();
    return { message: `${count} estudantes encontrados`, students, count };
  }

  async findOne(id: string): Promise<FindOneStudentResponse> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
    }

    return { message: 'Estudante encontrado!', student };
  }
}
