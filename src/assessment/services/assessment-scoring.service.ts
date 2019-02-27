import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';
import { AssessmentService } from './assessment.service';
import { AssessmentScoringHelper } from '../helpers/assessment-scoring.helper';

@Injectable()
export class AssessmentDeliveryService {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly assessmentScoringHelper: AssessmentScoringHelper,
  ) {}

  async grade(assessment: Assessment): Promise<Assessment> {
    // perform some other logic here, calculate score
    assessment.score = this.assessmentScoringHelper.calculateScore(assessment);
    return this.assessmentService.update(assessment);
  }
}
