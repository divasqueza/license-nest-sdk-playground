import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';

@Injectable()
export class AssessmentScoringHelper {
  calculateScore(assessment: Assessment): number {
    return assessment.status === 'active' ? 10 : 5;
  }
}
