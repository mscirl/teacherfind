import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Raw } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { CreateStudentResponse, FindAllStudentsResponse, FindOneStudentResponse } from './student.interface';
import { Teacher } from 'src/teacher/teacher.entity';
import { calculateDistance } from 'src/utils/utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
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

  async matchTeachers(
    studentId: string,
    maxDistance: number, // Distância máxima em quilômetros
  ): Promise<Teacher[]> {
    // Buscar os dados do aluno
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new Error(`Estudante com ID ${studentId} não encontrado.`);
    }

    // Buscar todos os professores que ensinam os interesses do aluno e estão disponíveis
       const availableTeachers = await this.teacherRepository.find({
      where: {
        specialities: Raw((alias) => `${alias} && ARRAY[${student.interests.map(interest => `'${interest}'`).join(', ')}]::text[]`),
        availability: true,
      },
    });
      console.info('Professores disponíveis que ensinam o assunto:', availableTeachers);

    const matchedTeachers = availableTeachers.filter((teacher) => {
      if (teacher.latitude && teacher.longitude && student.latitude && student.longitude) {
        const distance = calculateDistance(
          student.latitude,
          student.longitude,
          teacher.latitude,
          teacher.longitude,
        );
        return distance <= maxDistance;
      }
      return false;
    });

    return matchedTeachers;
  }
}
