import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';

@Injectable()
export class AssessmentRepository {
  async save(assessment: Assessment): Promise<Assessment> {
    assessment.id = Math.random();
    return Promise.resolve(assessment);
  }

  async update(assessment: Assessment): Promise<Assessment> {
    assessment.status = 'in-progress';
    return Promise.resolve(assessment);
  }

  async findAll(): Promise<Assessment[]> {
    return Promise.resolve([
      new Assessment({ name: 'Math I', status: 'active' }),
    ]);
  }
}
