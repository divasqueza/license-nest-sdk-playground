import { Injectable } from '@nestjs/common';
import { Assessment } from '../models/assessment.model';
import { InvalidAssessmentStatusException } from '../exceptions/invalid-assessment-status.exception';

@Injectable()
export class AssessmentScoringHelper {
  /**
   * When documenting function make sure it provides useful information and not only signature details.
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
      ? 10 // inline comments should be avoided, use them when strictly necessary.
      : 5 * Math.pow(2, 10); // add a comment like this explaining non trivial details
  }
}
