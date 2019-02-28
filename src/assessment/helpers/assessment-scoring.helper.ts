import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';
import { InvalidAssessmentStatusException } from '../exceptions/invalid-assessment-status.exception';

@Injectable()
export class AssessmentScoringHelper {
  /**
   *
   * Calculates the assessment scored considering its status. Active assessments score is
   * hardcoded to 10. Closed assessments can not be scored.
   * @param {Assessment} assessment
   * @returns {number}
   * @throws {InvalidAssessmentStatusException} when the assessment is closed
   */
  calculateScore(assessment: Assessment): number {
    if (assessment.isClosed()) {
      throw new InvalidAssessmentStatusException('The assessment is closed');
    }
    return assessment.isActive()
      ? 10
      : 5 * Math.pow(2, 10); // applying a math formula for non active assessment
  }
}
