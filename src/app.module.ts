import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [TeacherModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE,
    useClass: ValidationPipe, },],
})
export class AppModule {}
