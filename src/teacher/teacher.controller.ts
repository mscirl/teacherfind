import { Body, Controller, Get, Delete, Param, Post, Query, HttpException, HttpStatus, Put } from '@nestjs/common';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { UpdateTeacherDto } from 'src/dtos/update-teacher.dto';
import { SucessResponseApi } from 'src/dtos/responses.dto';

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<SucessResponseApi<Teacher>> {
    try {
      return await this.teacherService.update(id, updateTeacherDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao atualizar o professor(a) de ID ${id}`,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.teacherService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Erro ao remover o professor(a) de ID ${id}`,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
