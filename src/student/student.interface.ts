import { Student } from './student.entity';

export interface CreateStudentResponse {
  message: string;
  student: Student;
}

export interface FindAllStudentsResponse {
  message: string;
  students: Student[];
  count: number;
}

export interface FindOneStudentResponse {
  message: string;
  student: Student;
}
