import { Body, Controller, Get, Param, Post, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create')
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      return await this.teacherService.createTeacher(createTeacherDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao criar o professor',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllTeachers(
  @Query('location') location: string,
  @Query('theme') theme: string,
): Promise<{ message: string; teachers: Teacher[]; count: number }> {
  try {
    return await this.teacherService.findAll(location, theme);
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao buscar professores',
        message: error.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<Teacher> {
    try {
      return await this.teacherService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao buscar o professor com id ${id}`,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
