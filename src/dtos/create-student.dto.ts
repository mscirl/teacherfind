export class CreateStudentDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly zipCode: string;
  readonly password: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly phone: string;
  readonly interests: string[];
}
