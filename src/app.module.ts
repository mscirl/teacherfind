import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [], //Adicionar aqui as entidades
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TeacherModule]),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE,
    useClass: ValidationPipe, },],
})
export class AppModule {}
