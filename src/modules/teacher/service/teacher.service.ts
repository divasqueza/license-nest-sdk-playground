
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Teacher, TeacherInput } from '../model';

@Injectable()
export class TeacherService {

    public constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) { }

    public async find(): Promise<Teacher[]> {
        return this.teacherRepository.find();
    }

    public async create(input: TeacherInput): Promise<Teacher> {

        const teacher = new Teacher();

        teacher.firstName = input.firstName;
        teacher.lastName = input.lastName;

        return this.teacherRepository.create(teacher);
    }

}
