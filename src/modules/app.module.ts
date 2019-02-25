
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common';
import { TeacherModule } from './teacher/teacher.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRoot(),
        TeacherModule
    ]
})
export class ApplicationModule {}
