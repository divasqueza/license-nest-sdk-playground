
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common';
import { TeacherController } from './controller';
import { Teacher } from './model';
import { TeacherService } from './service';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([
            Teacher
        ])
    ],
    providers: [
        TeacherService
    ],
    controllers: [
        TeacherController
    ],
    exports: []
})
export class TeacherModule { }
