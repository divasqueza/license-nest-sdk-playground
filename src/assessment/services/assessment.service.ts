import { Injectable } from '@nestjs/common';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { Assessment } from '../models/assessment.model';
import { AssessmentConfiguration } from '../configuration/assessment.configuration';

/**
 * Services just like any other component should be briefly documented explaining its intention, you can some high level
 * implementation details if necessary.
 *
 * @see {@link ./AssessmentScoringService}
 * @author javier.perez
 */
@Injectable()
export class AssessmentService {
  constructor(
    private readonly assessmentRepository: AssessmentRepository,
    private readonly assessmentConfiguration: AssessmentConfiguration,
  ) {}

  async create(assessment: Assessment): Promise<Assessment> {
    if (!assessment.idleTimeout) {
      assessment.idleTimeout = this.assessmentConfiguration.idleTimeout();
    }
    return this.assessmentRepository.save(assessment);
  }

  async update(assessment: Assessment): Promise<Assessment> {
    return this.assessmentRepository.update(assessment);
  }

  async findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.findAll();
  }
}
