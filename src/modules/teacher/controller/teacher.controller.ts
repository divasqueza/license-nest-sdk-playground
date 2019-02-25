
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { LoggerService } from '../../common/provider';
import { TeacherPipe } from '../flow';
import { TeacherData, TeacherInput } from '../model';
import { TeacherService } from '../service';

@Controller('teachers')
@ApiUseTags('teacher')
@ApiBearerAuth()
export class TeacherController {

    public constructor(
        private readonly logger: LoggerService,
        private readonly teacherService: TeacherService
    ) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: TeacherData })
    public async find(): Promise<TeacherData[]> {

        const teachers = await this.teacherService.find();

        return teachers.map((teacher) => teacher.buildData());
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: TeacherData })
    public async create(@Body(new TeacherPipe()) input: TeacherInput): Promise<TeacherData> {

        const teacher = await this.teacherService.create(input);
        this.logger.info(`Created new teacher with ID ${teacher.id}`);

        return teacher.buildData();
    }

}
