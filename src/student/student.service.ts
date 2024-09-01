import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Raw } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { CreateStudentResponse, FindAllStudentsResponse, FindOneStudentResponse } from './student.interface';
import { Teacher } from 'src/teacher/teacher.entity';
import { calculateDistance } from 'src/utils/utils';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

async create(createStudentDto: CreateStudentDto): Promise<CreateStudentResponse> {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

    // Cria objeto do estudante, substituindo a senha pelo hash
    const student = this.studentRepository.create({
      ...createStudentDto,
      password: hashedPassword,
    });

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

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<FindOneStudentResponse> {
  const student = await this.studentRepository.findOne({ where: { id } });

  if (!student) {
    throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
  }

  await this.studentRepository.update(id, updateStudentDto);

  const updatedStudent = await this.studentRepository.findOne({ where: { id } });
  return { message: 'Estudante atualizado com sucesso!', student: updatedStudent };
}

async delete(id: string): Promise<{ message: string }> {
  const student = await this.studentRepository.findOne({ where: { id } });

  if (!student) {
    throw new NotFoundException(`Estudante com ID ${id} não encontrado`);
  }

  await this.studentRepository.delete(id);
  return { message: `Estudante com ID ${id} removido com sucesso` };
}


  
 /**
 * Encontra professores que correspondem aos interesses de um estudante e estão disponíveis.
 * 
 * @param studentId - O ID do estudante para o qual os professores serão buscados.
 * @param maxDistance - (Opcional) A distância máxima em quilômetros para a busca dos professores. 
 *                      Se não for fornecido, será retornado o professor mais próximo.
 * @returns Uma promessa que resolve em um array de professores que correspondem aos critérios.
 *          Se `maxDistance` for fornecido, retorna todos os professores dentro dessa distância.
 *          Se `maxDistance` não for fornecido, retorna apenas o professor mais próximo.
 * 
 * @throws Error - Lança um erro se o estudante com o ID fornecido não for encontrado.
 * 
 * @description
 * A função primeiro busca os dados do estudante usando o `studentId`. 
 * Em seguida, busca todos os professores disponíveis que ensinam as especialidades de interesse do estudante.
 * 
 * - Se `maxDistance` for definido, filtra os professores para incluir apenas aqueles dentro da distância especificada.
 * - Se `maxDistance` não for definido, usa `reduce` para encontrar e retornar o professor mais próximo ao estudante.
 * 
 * A função leva em consideração as coordenadas de latitude e longitude tanto do estudante quanto dos professores
 * para calcular a distância usando a fórmula de Haversine.
 */
async matchTeachers(
  studentId: string,
  maxDistance?: number,
): Promise<Teacher[]> {
  const student = await this.studentRepository.findOne({ where: { id: studentId } });
  if (!student) {
    throw new Error(`Estudante com ID ${studentId} não encontrado.`);
  }

  const availableTeachers = await this.teacherRepository.find({
    where: {
      specialities: Raw((alias) => `${alias} && ARRAY[${student.interests.map(interest => `'${interest}'`).join(', ')}]::text[]`),
      availability: true,
    },
  });

  if (maxDistance !== undefined && maxDistance !== null) {
    return availableTeachers.filter((teacher) => {
      if (!teacher.latitude || !teacher.longitude || !student.latitude || !student.longitude) {
        return false;
      }
      const distance = calculateDistance(
        student.latitude,
        student.longitude,
        teacher.latitude,
        teacher.longitude,
      );
      return distance <= maxDistance;
    });
  } else {
    const closestTeacher = availableTeachers.reduce<{ teacher: Teacher | null; distance: number | null }>(
      (closest, teacher) => {
        if (!teacher.latitude || !teacher.longitude || !student.latitude || !student.longitude) {
          return closest;
        }

        const distance = calculateDistance(
          student.latitude,
          student.longitude,
          teacher.latitude,
          teacher.longitude,
        );

        if (closest.distance === null || distance < closest.distance) {
          return { teacher, distance };
        }

        return closest;
      },
      { teacher: null, distance: null }
    );

    return closestTeacher.teacher ? [closestTeacher.teacher] : [];
  }
}

}
