import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [TeacherModule, StudentModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE,
    useClass: ValidationPipe, },],
})
export class AppModule {}
