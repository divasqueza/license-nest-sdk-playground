import { Injectable } from '@nestjs/common';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { Assessment } from '../models/assessment.model';

/**
 * Services just like any other component should be briefly documented explaining its intention, you can some high level
 * implementation details if necessary.
 *
 * @see {@link ./AssessmentScoringService}
 * @author javier.perez
 */
@Injectable()
export class AssessmentService {
  constructor(private readonly assessmentRepository: AssessmentRepository) {}

  async create(assessment: Assessment): Promise<Assessment> {
    // do some other logic here, like throwing an event, calling other services, repositories, helpers, etc
    return this.assessmentRepository.save(assessment);
  }

  async update(assessment: Assessment): Promise<Assessment> {
    return this.assessmentRepository.update(assessment);
  }

  async findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.findAll();
  }
}