import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTeacherDto } from '../dtos/teacher.dto';
import { TeacherService } from './teacher.service';

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
    @Query('theme') theme: string): Promise<CreateTeacherDto[]>{
    const teachers = await this.teacherService.findAll(location, theme);
    return teachers;
    }
}