import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';
import { AssessmentService } from './assessment.service';
import { AssessmentScoringHelper } from '../helpers/assessment-scoring.helper';

/**
 * The AssessmentDeliveryService is in charge of calculating scores for different assessment types, base
 * on different algorithms.
 *
 *
 * @author javier.perez
 */
@Injectable()
export class AssessmentDeliveryService {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly assessmentScoringHelper: AssessmentScoringHelper,
  ) {}

  /**
   * Grades different assessment types based on the number of questions assigned. No changes are performed
   * when the assessment is already graded.
   * @param {Assessment} assessment
   * @returns {Promise<Assessment>}
   */
  async grade(assessment: Assessment): Promise<Assessment> {
    if (!assessment.hasScore()) {
      assessment.score = this.assessmentScoringHelper.calculateScore(
        assessment,
      );
      await this.assessmentService.update(assessment);
    }
    // perform some other logic here, calculate score

    return assessment;
  }
}
