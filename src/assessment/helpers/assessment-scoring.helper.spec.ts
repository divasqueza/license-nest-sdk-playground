import { Assessment } from '../models/assessment.model';
import { AssessmentScoringHelper } from './assessment-scoring.helper';
import { InvalidAssessmentStatusException } from '../exceptions/invalid-assessment-status.exception';

describe('AssessmentScoringHelper', () => {
  it('calculateScore when assessment is closed', async () => {
    const helper = new AssessmentScoringHelper();

    const assessment = new Assessment({
      status: 'closed',
    });

    expect(() => {
      helper.calculateScore(assessment);
    }).toThrow(InvalidAssessmentStatusException);
  });

  it('calculateScore when assessment is active', async () => {
    const helper = new AssessmentScoringHelper();

    const assessment = new Assessment({
      status: 'active',
    });

    const score = helper.calculateScore(assessment);
    expect(score).toBe(10);
  });

  it('calculateScore when assessment is not closed or active', async () => {
    const helper = new AssessmentScoringHelper();

    const assessment = new Assessment({
      status: 'in-progress',
    });

    const score = helper.calculateScore(assessment);
    expect(score).toBe(5120);
  });
});
