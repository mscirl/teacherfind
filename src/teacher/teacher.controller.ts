import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTeacherDto } from '../dtos/teacher.dto';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create')
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  async getAllTeachers(
    @Query('location') location: string,
    @Query('theme') theme: string,
  ): Promise<Teacher[]> {
    return this.teacherService.findAll(location, theme);
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }
}
