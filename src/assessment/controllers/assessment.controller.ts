import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Assessment } from '../models/assessment.model';
import { AssessmentService } from '../services/assessment.service';
import { InternalAssessmentGuard } from '../guards/internal-assessment.guard';
import { AssessmentExceptionFilter } from '../filters/assessment-exception.filter';

/**
 * Manages the assessments CRUD operations. It only supports/handles internal assessment types.
 *
 * @see {InternalAssessmentGuard}
 * @author javier.perez
 */
@Controller('assessments')
@UseGuards(InternalAssessmentGuard)
@UseFilters(new AssessmentExceptionFilter())
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  create(@Body() assessment: Assessment) {
    return this.assessmentService.create(assessment);
  }

  @Get()
  async findAll(): Promise<Assessment[]> {
    return this.assessmentService.findAll();
  }
}
