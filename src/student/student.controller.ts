import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { CreateStudentResponse, FindAllStudentsResponse, FindOneStudentResponse } from './student.interface';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() createStudentDto: CreateStudentDto): Promise<CreateStudentResponse> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<FindAllStudentsResponse> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneStudentResponse> {
    return this.studentService.findOne(id);
  }
}
